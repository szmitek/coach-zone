import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_EXERCISE_MUTATION = gql`
  mutation DELETE_EXERCISE_MUTATION($id: ID!) {
    deleteExercise(id: $id) {
      id
      name
    }
  }
`;
// function to reload the exercise object after a mutation is applied
function update(cache, payload) {
  console.log(payload);
  console.log('running the update function after delete');
  cache.evict(cache.identify(payload.data.deleteExercise));
}

export default function DeleteExercise({ id, children }) {
  const [deleteExercise, { loading, error }] = useMutation(
    DELETE_EXERCISE_MUTATION,
    {
      variables: { id },
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this exercise')) {
          // go ahead and delete the exercise
          console.log('DELETE');
          deleteExercise().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
