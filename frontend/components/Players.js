import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Player from './Player';

export const ALL_PLAYERS_QUERY = gql`
  query ALL_PLAYERS_QUERY {
    allPlayers {
      id
      name
      description
      position
      strengths
      weaknesses
      number
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const PlayersListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Players() {
  const { data, error, loading } = useQuery(ALL_PLAYERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <PlayersListStyles>
        {data.allPlayers.map((player) => (
          <Player key={player.id} player={player} />
        ))}
      </PlayersListStyles>
    </div>
  );
}
