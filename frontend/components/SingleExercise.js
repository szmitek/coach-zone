import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

const ExerciseStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Exercise(where: { id: $id }) {
      name
      description
      id
      position {
        id
        name
      }
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleExercise({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Exercise } = data;
  return (
    <ExerciseStyles>
      <Head>
        <title>Coach Zone | {Exercise.name}</title>
      </Head>
      <img
        src={Exercise.photo.image.publicUrlTransformed}
        alt={Exercise.photo.altText}
      />
      <div className="details">
        <h2>{Exercise.name}</h2>
        <h3>Destination: {Exercise.position.name}</h3>
        <p>{Exercise.description}</p>
      </div>
    </ExerciseStyles>
  );
}
