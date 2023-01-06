import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import ErrorMessage from '../../components/ErrorMessage';
import TeamStyles from '../../components/styles/TeamStyles';
import { useUser } from '../../components/User';

// function TeamItem({ teamItem }) {
//    const { team } = teamItem;
//    if (!team) return null;
//    return (
//        <div className='team-player'>
//            <img
//                src={teamItem.photo.image.publicUrlTransformed}
//                alt={teamItem.name}
//            />
//                <h2>{teamItem.name}</h2>
//                <h3>{teamItem.position}</h3>
//                <h3>{teamItem.number}</h3>
//                <p>{teamItem.description}</p>
//                <p>{teamItem.strengths}</p>
//                <p>{teamItem.weaknesses}</p>
//
//        </div>
//    )
// }

export default function ShowTeamPage() {
  const me = useUser();
  if (!me) return null;
  return (
    <TeamStyles>
      <Head>
        <title>Your SQUAD</title>
      </Head>
      <div className="players">
        {me.team.players.map((teamItem) => (
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
