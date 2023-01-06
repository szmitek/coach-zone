import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_TRAINING_MUTATION = gql`
  mutation REMOVE_FROM_TRAINING_MUTATION($id: ID!) {
    deleteTrainingItem(id: $id) {
      id
    }
  }
`;

export default function RemoveFromTraining({ id }) {
  const [removeFromTraining, { loading }] = useMutation(
    REMOVE_FROM_TRAINING_MUTATION,
    {
      variables: { id },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  return (
    <BigButton
      onClick={removeFromTraining}
      disabled={loading}
      type="button"
      title="Remove this exercise from training"
    >
      &times;
    </BigButton>
  );
}
