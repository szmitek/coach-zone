import Link from 'next/link';
import DeleteExercise from './DeleteExercise';
import ItemStyles from './styles/ItemStyles';
import Position from './styles/Position';
import Title from './styles/Title';
import AddToTraining from './AddToTraining';

export default function Exercise({ exercise }) {
  return (
    <ItemStyles>
      <img
        src={exercise?.photo?.image?.publicUrlTransformed}
        alt={exercise.name}
      />
      <Title>
        <Link href={`/exercise/${exercise.id}`}>{exercise.name}</Link>
      </Title>
      <Position>{exercise.position}</Position>
      <p>{exercise.description}</p>
      <div className="buttonList">
          <Link
              href="/exercises/update"
              query={{
                  id: exercise.id,
              }}
          >
              Edit ✏️
          </Link>
        <AddToTraining id={exercise.id} />
        <DeleteExercise id={exercise.id}>Delete</DeleteExercise>
      </div>
    </ItemStyles>
  );
}
