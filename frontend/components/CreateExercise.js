import useForm from "../lib/useForm";
import Form from './styles/Form';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import DisplayError from './ErrorMessage';
import { ALL_EXERCISES_QUERY } from "./Exercises";
import Router from 'next/router';


const CREATE_EXERCISE_MUTATION = gql`
    mutation CREATE_EXERCISE_MUTATION(
        $name: String!
        $description: String!
        $image: Upload!
        $position: String
    ) {
        createExercise(
            data: {
                name: $name
                description: $description
                photo: { create: { image: $image, altText: $name } }
                position: $position
            }
        )    {
                id
                description
                name
                position
            }
    }
`;

export default function CreateExercise() {
    const { inputs, handleChange, clearForm, resetForm} = useForm({
        image: '',
        name: '',
        description: '',
    });

    const [createExercise, {loading, error, data}] = useMutation(CREATE_EXERCISE_MUTATION, {
        variables: inputs,
        refetchQueries: [{query: ALL_EXERCISES_QUERY}],
    })

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            //submit the inputsfiled to the backend
            const res = await createExercise();
            clearForm();
            Router.push({
                pathname: `/exercise/${res.data.createExercise.id}`
            })
        }}>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="image">Image
                <input type="file" id="image" name="image" onChange={handleChange} />
            </label>
            <label htmlFor="name">
            Name 
            <input 
                type="text"     
                id="name" 
                name="name" 
                placeholder="Name"
                value={inputs.name}    
                onChange={handleChange}
            />   
            </label>
            <label htmlFor="description">
                Description
                <textarea 
                id="description" 
                name="description" 
                placeholder="Description" 
                onChange={handleChange} 
                value={inputs.description} 
                />

            </label>
            <label htmlFor="position">
                Position
                <select id="position" name="position" placeholder="Position" onChange={handleChange}>
                    <option value='OL'>OL</option>
                    <option value='RB'>RB</option>
                    <option value='WR'>WR</option>
                    <option value='DL'>DL</option>
                    <option value='LB'>LB</option>
                    <option value='DB'>DB</option>
                
                </select>
                </label>
            <button type="submit">+ Add Exercise</button>
            </fieldset>
        </Form>
    )
}