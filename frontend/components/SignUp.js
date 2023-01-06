import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

const CREATE_TEAM_MUTATION = gql`
  mutation CREATE_TEAM_MUTATION($userId: ID!) {
    createTeam(data: { user: { connect: { id: $userId } } }) {
      id
      user {
        id
      }
    }
  }
`;

export default function SignUp() {
  const [
    signup,
    { data: signupData, loading: signupLoading, error: signupError },
  ] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const [
    createTeam,
    {
      data: createTeamData,
      loading: createTeamLoading,
      error: createTeamError,
    },
  ] = useMutation(CREATE_TEAM_MUTATION);
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup({
      variables: {
        email: inputs.email,
        name: inputs.name,
        password: inputs.password,
      },
    });

    // If the signup is successful, create a new team and associate it with the logged in user
    if (res.data.createUser) {
      await createTeam({
        variables: {
          userId: res.data.createUser.id,
        },
      });
    }

    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up for an Account</h2>
      <Error error={signupError || createTeamError} />
      <fieldset
        disabled={signupLoading || createTeamLoading}
        aria-busy={signupLoading || createTeamLoading}
      >
        {signupData?.createUser && (
          <p>
            Signed up with {signupData.createUser.email} - Please Go Head and
            Sign in!
          </p>
        )}
        <label htmlFor="email">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}
