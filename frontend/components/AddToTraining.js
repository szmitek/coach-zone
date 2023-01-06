import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_TRAINING_MUTATION = gql`
  mutation ADD_TO_TRAINING_MUTATION($id: ID!) {
    addToTraining(exerciseId: $id) {
      id
    }
  }
`;

export default function AddToTraining({ id }) {
  const [addToTraining, { loading }] = useMutation(ADD_TO_TRAINING_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button disabled={loading} type="button" onClick={addToTraining}>
      Add{loading && 'ing'} to training
    </button>
  );
}
