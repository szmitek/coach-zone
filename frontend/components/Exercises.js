import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import Exercise from './Exercise';

export const ALL_EXERCISES_QUERY = gql`
    query ALL_EXERCISES_QUERY($skip: Int = 0, $first: Int) {
        allExercises(first: $first, skip: $skip) {
            id
            name
            description
            position
            photo {
                id
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;

const ExercisesListStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;


export default function Exercises({page}) { 
    const {data, error, loading } = useQuery(ALL_EXERCISES_QUERY, {
        variables: {
            skip: page * perPage - perPage,
            first: perPage,
        }
    });
    if(loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <ExercisesListStyles>
                {data.allExercises.map(exercise => (
                    <Exercise key={exercise.id} exercise={exercise} />
                ))}
            </ExercisesListStyles>
        </div>
    );
}