import styled from 'styled-components';
import { useUser } from './User';
import TrainingStyles from './styles/TrainingStyles';
import Supreme from './styles/Supreme';
import { useTraining } from '../lib/trainingState' 
import CloseButton from './styles/CloseButton';
import RemoveFromTraining from './RemoveFromTraining';

const TrainingItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  },
`;

function TrainingItem({ trainingItem }) {
  const { exercise } = trainingItem;
  if (!exercise) return null;
  //console.log(exercise);
  return (
    <TrainingItemStyles>
      <img
        width="100"
        src={exercise.photo.image.publicUrlTransformed}
        alt={exercise.name}
      />
      <div>
        <h3>{exercise.name}</h3>
        <h2>{exercise.position}</h2>
      </div>
      <RemoveFromTraining id={trainingItem.id} />
    </TrainingItemStyles>
  );
}

export default function Training() {
  const me = useUser();
  const { trainingOpen, closeTraining } = useTraining();
  if (!me) return null;
  return (
    <TrainingStyles open={trainingOpen}>
      <header>
        <Supreme>{me.name}'s Training</Supreme>
        <CloseButton onClick={closeTraining}>&times;</CloseButton>
      </header>
      <ul>
        {me.training.map((trainingItem) => (
          <TrainingItem key={trainingItem.id} trainingItem={trainingItem} />
        ))}
      </ul>
      <footer>
        
      </footer>
    </TrainingStyles>
  );
}
