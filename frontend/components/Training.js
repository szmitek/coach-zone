import styled from 'styled-components';
import { useUser } from './User';
import TrainingStyles from './styles/TrainingStyles';
import Supreme from './styles/Supreme';
import { useTraining } from '../lib/trainingState';
import CloseButton from './styles/CloseButton';
import RemoveFromTraining from './RemoveFromTraining';
import Group from './styles/Group'
import _ from 'lodash';
import Link from 'next/link';
import { useEffect } from 'react';

const TrainingItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-rows: auto 1fr;
  img {
    width: 170px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 1rem;
  }
  h3 {
    margin: 0;
  }
`;

const GroupContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  width: 100%;
  height: 300px;
`;

function TrainingItem({ trainingItem, closeTraining }) {
    const { exercise } = trainingItem;
    if (!exercise) return null;
    return (
        <TrainingItemStyles>
            <img
                width="100"
                src={exercise.photo.image.publicUrlTransformed}
                alt={exercise.name}
            />
            <div>
                <h3>
                    <Link href={`/exercise/${exercise.id}`}>{exercise.name}</Link>
                </h3>
            </div>
            <RemoveFromTraining id={trainingItem.id} />
        </TrainingItemStyles>
    );
}

export default function Training() {
    const me = useUser();
    const { trainingOpen, closeTraining } = useTraining();
    if (!me) return null;


    // Group the training items by position
    const groupedTraining = _.groupBy(me.training, 'exercise.position');

     return (
        <TrainingStyles open={trainingOpen}>
            <header>
                <Supreme>{me.name}'s Training</Supreme>
                <CloseButton onClick={closeTraining}>&times;</CloseButton>
            </header>
            {/* Render a list of items for each group */}
            <GroupContainer>
                {Object.entries(groupedTraining).map(([position, trainingItems]) => (
                    <Group key={position}>
                        <h2>{position}</h2>
                        <ul>
                            {trainingItems.map((trainingItem) => (
                                <TrainingItem key={trainingItem.id} trainingItem={trainingItem} closeTraining={closeTraining} />
                            ))}
                        </ul>
                    </Group>
                ))}
            </GroupContainer>
        </TrainingStyles>
    );
}
