import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Players from '../components/Players';
import ErrorMessage from '../components/ErrorMessage';
import OrderStyles from '../components/styles/OrderStyles';

const SHOW_PLAYERS_QUERY = gql`
  query SHOW_PLAYERS_QUERY($id: ID!) {
    team: Team(where: { id: $id }) {
      id
      user {
        id
      }
      players {
        id
        description
        position
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

// eslint-disable-next-line react/prop-types
export default function ShowTeamPage({ query }) {
  const { data, error, loading } = useQuery(SHOW_PLAYERS_QUERY, {
    // eslint-disable-next-line react/prop-types
    variables: { id: query.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { team } = data;
  return (
    <OrderStyles>
      <Head>
        <title>Your SQUAD - {team.id}</title>
      </Head>
      <div className="items">
        {team.players.map((player) => (
          <div className="team-player" key={player.id}>
            <img
              src={player.photo.image.publicUrlTransformed}
              alt={player.title}
            />
            <div className="player-details">
              <h2>{player.name}</h2>
              <p>{player.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}
