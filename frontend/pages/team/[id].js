import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import ErrorMessage from '../../components/ErrorMessage';
import TeamStyles from '../../components/styles/TeamStyles';
import { useUser } from '../../components/User';

const TEAM_PLAYERS_QUERY = gql`
    query TEAM_PLAYERS_QUERY($teamId: ID!) {
        Team(where: { id: $teamId }) {
            players(where: { team: { id: $teamId } }) {
                id
                name
                position
                number
                description
                strengths
                weaknesses
                photo {
                    image {
                        publicUrlTransformed
                    }
                }
            }
        }
    }
`;

export default function ShowTeamPage() {
    const me = useUser();
    if (!me) return null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery(TEAM_PLAYERS_QUERY, {
        variables: { teamId: me.team.id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorMessage error={error} />;

    return (
        <TeamStyles>
            <Head>
                <title>Your SQUAD</title>
            </Head>
            <div className="players">
                {data.Team.players.map((teamItem) => (
                    <div className="team-player" key={teamItem.id}>
                        <img
                            src={teamItem.photo.image.publicUrlTransformed}
                            alt={teamItem.name}
                        />
                        <div className="player-details">
                            <h2>Name: {teamItem.name}</h2>
                            <h3>Position: {teamItem.position}</h3>
                            <h3>Number: {teamItem.number}</h3>
                            <p>About: {teamItem.description}</p>
                            <p>Strengths: {teamItem.strengths}</p>
                            <p>Weaknesses: {teamItem.weaknesses}</p>
                        </div>
                    </div>
                ))}
            </div>
        </TeamStyles>
    );
}
