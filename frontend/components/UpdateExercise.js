import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { useRouter } from 'next/router'
import {useState} from "react";

const SINGLE_EXERCISE_QUERY = gql`
  query SINGLE_EXERCISE_QUERY($id: ID!) {
    Exercise(where: { id: $id }) {
      id
      name
      description
      position {
        name
      }
    }
  }
`;

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

const UPDATE_EXERCISE_MUTATION = gql`
  mutation UPDATE_EXERCISE_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $sportCategory: ID!
    $position: ID!
  ) {
    updateExercise(
      id: $id
      data: { 
        name: $name, 
        description: $description,
        sportCategory: { connect: { id: $sportCategory } }
        position: { connect: { id: $position } } 
      }
    ) {
      id
      name
      description
      sportCategory {
        name
      }
      position {
        name
      }
    }
  }
`;

export default function UpdateExercise({ id }) {
  const router = useRouter()
  // get existing exercise
  const { data, loading, error } = useQuery(SINGLE_EXERCISE_QUERY, {
    variables: { id },
  });
  // get mutation to update exercise
  const [
    updateExercise,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_EXERCISE_MUTATION);
  // Create some state for the form inputs:
  const { inputs, handleChange, handleFileChange, clearForm, resetForm } = useForm(
      data?.Exercise
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data?.Exercise) return <p>Exercise not found</p>;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await updateExercise({
        variables: {
          id,
          name: inputs.name,
          description: inputs.description,
          sportCategory: inputs.sportCategory,
          position: inputs.position,
        },
      });
      if (data) {
        router.push('/exercises')
      }
    } catch (err) {
      console.log(err);
    }
  }
  const { data: sportsCategoriesData, loading: sportsCategoriesLoading, error: sportsCategoriesError } = useQuery(
      ALL_SPORTCATEGORY_QUERY
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
          onSubmit={handleSubmit}
      >
        <DisplayError error={updateError} />
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
        <button type="submit">Update Exercise</button>
      </fieldset>
    </Form>
  );
}
