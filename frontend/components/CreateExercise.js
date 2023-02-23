import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_EXERCISES_QUERY } from './Exercises';
import {useState} from "react";

const ALL_SPORTCATEGORY_QUERY = gql`
  query ALL_SPORTCATEGORY_QUERY {
    allSportCategories {
      id
      name
      positions {
        id
        name
      }
    }
  }
`;

const CREATE_EXERCISE_MUTATION = gql`
  mutation CREATE_EXERCISE_MUTATION(
    $name: String!
    $description: String!
    $image: Upload!
    $sportCategory: ID!
    $position: ID!
  ) {
    createExercise(
      data: {
        name: $name
        description: $description
        photo: { create: { image: $image, altText: $name } }
        sportCategory: { connect: { id: $sportCategory } }
        position: { connect: { id: $position } }
      }
    ) {
      id
      description
      name
      sportCategory {
        name
      }
      position {
        name
      }
    }
  }
`;

export default function CreateExercise() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: '',
    description: '',
    sportCategory: '',
    position: ''
  });

  const { data: sportsCategoriesData, loading: sportsCategoriesLoading, error: sportsCategoriesError } = useQuery(
      ALL_SPORTCATEGORY_QUERY
  );

  const [createExercise, { loading, error, data }] = useMutation(
      CREATE_EXERCISE_MUTATION,
      {
        variables: inputs,
        refetchQueries: [{ query: ALL_EXERCISES_QUERY }],
      }
  );

  const sportsCategories = sportsCategoriesData && sportsCategoriesData.allSportCategories || [];
  const [positions, setPositions] = useState([]);

  const handleSportCategoryChange = (e) => {
    const sportCategoryId = e.target.value;
    const selectedSportCategory = sportsCategories.find(
        (category) => category.id === sportCategoryId
    );
    const selectedPositions = selectedSportCategory
        ? selectedSportCategory.positions
        : [];
    setPositions(selectedPositions);
    // set the selected sport category id
    handleChange(e);
  };

  return (
      <Form
          onSubmit={async (e) => {
            e.preventDefault();
            // submit the inputsfiled to the backend
            const res = await createExercise();
            clearForm();
            Router.push({
              pathname: `/exercise/${res.data.createExercise.id}`,
            });
          }}
      >
        <DisplayError error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="image">
            Image
            <input type="file" id="image" name="image" onChange={handleChange} />
          </label>
          <label htmlFor="name">
            Name
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={inputs.name}
                onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
                id="description"
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={inputs.description}
            />
          </label>
          <label htmlFor="sportCategory">
            Sport Category
            <select
                id="sportCategory"
                name="sportCategory"
                placeholder="Sport Category"
                onChange={handleSportCategoryChange}
                value={inputs.sportCategory}
            >
              <option value="">Select a sport category</option>
              {sportsCategories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
              ))}
            </select>
          </label>
          <label htmlFor="position">
            Position
            <select
                id="position"
                name="position"
                placeholder="Position"
                onChange={handleChange}
            >
              <option value="">Select a position</option>
              {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.name}
                  </option>
              ))}
            </select>
          </label>
          <button type="submit">+ Add Exercise</button>
        </fieldset>
      </Form>
  );
}
