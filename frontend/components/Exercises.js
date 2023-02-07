import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import Exercise from './Exercise';
import {useUser} from "./User";

export const ALL_EXERCISES_QUERY = gql`
  query ALL_EXERCISES_QUERY($skip: Int = 0, $first: Int, $sportCategory: SportCategoryWhereInput) {
    allExercises(first: $first, skip: $skip, where: { sportCategory: $sportCategory } ) {
      id
      name
      description
      position {
        id
        name
      }
      user{
        id
      }
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
const ALL_EXERCISES_QUERY_PUBLIC = gql`
  query ALL_EXERCISES_QUERY($skip: Int = 0, $first: Int) {
    allExercises(first: $first, skip: $skip) {
      id
      name
      description
      position {
        id
        name
      }
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ExercisesListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Exercises({ page, sportCategory }) {
  const user = useUser();
  const query = user ? ALL_EXERCISES_QUERY : ALL_EXERCISES_QUERY_PUBLIC;
  const { data, error, loading } = useQuery(query, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
      sportCategory: { name: sportCategory }
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const checkPermissions = (user) => {
    if (!user) return { read: true };
    return { read: true };
  };
  const permissions = checkPermissions(user);
  if (!permissions.read) return null;
  return (
      <div>
        <ExercisesListStyles>
          {data.allExercises.map((exercise) => (
              <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </ExercisesListStyles>
      </div>
  );
}
