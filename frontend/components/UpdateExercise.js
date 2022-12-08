import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const SINGLE_EXERCISE_QUERY = gql`
    query SINGLE_EXERCISE_QUERY($id: ID!) {
        Exercise(where: {id: $id}) {
            id
            name
            description
            position
        }
    }
`;

const UPDATE_EXERCISE_MUTATION = gql`
    mutation UPDATE_EXERCISE_MUTATION(
        $id: ID!
        $name: String
        $description: String
        $position: String
    ) {
        updateExercise(
            id: $id
            data: {
                name: $name,
                description: $description,
                position: $position,
            }
        ) {
            id
            name
            description
            position
            }
        }
`;


export default function UpdateExercise({id}) {
    // get existing exercise 
        const {data, loading, error} = useQuery(SINGLE_EXERCISE_QUERY, {
            variables: {id},
        });
    // get mutation to update exercise
    const [updateExercise, { data: updateData, error: updateError, loading: updateLoading },
      ] = useMutation(UPDATE_EXERCISE_MUTATION);
      // Create some state for the form inputs:
      const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Exercise);
      console.log(inputs);
      if (loading) return <p>loading...</p>;

        return (
            <Form onSubmit={async (e) => {
                e.preventDefault();
                const res = await updateExercise({
                    variables: {
                        id,
                        name: inputs.name,
                        description: inputs.description,
                        position: inputs.position,
                    }
                }).catch(console.error);
                console.log(res);
            }}>

                <DisplayError error={error || updateError} />
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
                <button type="submit">Update Exercise</button>
                </fieldset>
            </Form>
        )
    }
