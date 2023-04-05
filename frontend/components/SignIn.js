import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
          team {
            id
          }
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const CREATE_TEAM_MUTATION = gql`
  mutation CREATE_TEAM_MUTATION($userId: ID!) {
    createTeam(data: { user: { connect: {id: $userId} } }) {
      id
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [createTeam] = useMutation(CREATE_TEAM_MUTATION);

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    const res = await signin();
    console.log(res);

    if (res?.data?.authenticateUserWithPassword?.item?.team == null) {
      // if the user does not have a team, create one
      await createTeam({
        variables: { userId: res?.data?.authenticateUserWithPassword?.item?.id },
      });
    }

    resetForm();
  }

  const error =
      data?.authenticateUserWithPassword.__typename ===
      'UserAuthenticationWithPasswordFailure'
          ? data?.authenticateUserWithPassword
          : undefined;

  return (
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Sign Into Your Account</h2>
        <Error error={error} />
        <fieldset>
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
                placeholder="Password"
                autoComplete="password"
                value={inputs.password}
                onChange={handleChange}
            />
          </label>
          <button type="submit">Sign In!</button>
        </fieldset>
      </Form>
  );
}
