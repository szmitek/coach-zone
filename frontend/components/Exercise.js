import Link from 'next/link';
import DeleteExercise from './DeleteExercise';
import ItemStyles from './styles/ItemStyles';
import Position from './styles/Position';
import Title from './styles/Title';
import AddToTraining from './AddToTraining';
import {useUser} from "./User";

export default function Exercise({ exercise }) {
    const user = useUser();
    console.log(exercise);

    const checkPermissions = (user, exercise) => {
        if (!user) return {update: false, delete: false, add: false, read: true};
        if (!exercise.user) return {update: false, delete: false, add: true, read: true}; // for cases where exercise don't have user id
        if (user.id === exercise.user.id) return {update: true, delete: true, add: true, read: true};
        return {update: false, delete: false, add: true, read: true};
    }
    const permissions = checkPermissions(user, exercise);
    if (!permissions.read) return null;
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
                {permissions.update && (
                    <Link
                        href="/exercises/update"
                        query={{
                            id: exercise.id,
                        }}
                    >
                        Edit ✏️
                    </Link>
                )}
                {permissions.add && (
                    <AddToTraining id={exercise.id}/>
                )}
                {permissions.delete && (
                    <DeleteExercise id={exercise.id}>Delete</DeleteExercise>
                )}
            </div>
        </ItemStyles>
    );
}
