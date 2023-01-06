import Link from 'next/link';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';
import { useTraining } from '../lib/trainingState';
import TrainingCount from './TrainingCount';

const TEAM_QUERY = gql`
  query USER_TEAM_QUERY {
    allTeams {
      id
    }
  }
`;

export default function Nav() {
  const { data, error, loading } = useQuery(TEAM_QUERY);
  const user = useUser();
  const { openTraining } = useTraining();
  return (
    <NavStyles>
      <Link href="/exercises">Exercises</Link>
      <Link href="/time">Time</Link>
      {user && (
        <>
          <Link href="/addExercise">Add Exercise</Link>
          <Link href="/calendar">Calendar</Link>
          <Link href={`/team/${data.id}`}>Team</Link>
          <Link href="/addPlayer">Add Player</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openTraining}>
            My Training
            <TrainingCount
              count={user.training.reduce(
                (tally, trainingItem) => tally + trainingItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
