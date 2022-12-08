import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import DisplayError from './ErrorMessage';
import styled from 'styled-components';

const PlayerStyles = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    justify-content: center;
    align-items: top;
    gap: 2rem;
    img {
        width: 100%;
        object-fit: contain;
    }
`


const SINGLE_PLAYER_QUERY = gql`
    query SINGLE_PLAYER_QUERY($id: ID!) {
        Player(where: { id: $id }) {
            name
            description
            id
            position
            number
            weaknesses
            strengths
            photo {
                id
                altText
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;

export default function SinglePlayer({ id }) {
    const { data, loading, error } = useQuery(SINGLE_PLAYER_QUERY, {
        variables: {
            id,
        }
    });
    if(loading) return <p>Loading...</p>
    if (error) return <DisplayError error={error} />;
    const { Player } = data;
        return (
            <PlayerStyles>
                <Head>
                    <title>Coach Zone | {Player.name}</title>
                </Head>
                <img src={Player.photo.image.publicUrlTransformed} alt={Player.photo.altText} />
                <div className="details">
                    <h2>{ Player.name }</h2>
                    <h3>Position: {Player.position}</h3>
                    <h3>Number {Player.number}</h3>
                    <p>{ Player.description}</p>
                    <p>{Player.weaknesses}</p>
                    <p>{Player.strengths}</p>

                </div>
            </PlayerStyles>
        ) 
}