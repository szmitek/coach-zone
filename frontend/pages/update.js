import UpdateExercise from "../components/UpdateExercise"

export default function UpdatePage({ query }) {
    return (
        <div>
            <UpdateExercise id={query.id} />
        </div>
    )
}