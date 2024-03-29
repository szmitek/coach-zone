import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PLAYERS_QUERY } from './Players';
import { useUser } from './User';

const CREATE_PLAYER_MUTATION = gql`
  mutation CREATE_PLAYER_MUTATION(
    $name: String!
    $description: String!
    $image: Upload!
    $position: String
    $number: String!
    $weaknesses: String
    $strengths: String
    $currentUserTeamId: ID!
  ) {
    createPlayer(
      data: {
        name: $name
        number: $number
        position: $position
        weaknesses: $weaknesses
        strengths: $strengths
        description: $description
        photo: { create: { image: $image, altText: $name } }
        team: { connect: { id: $currentUserTeamId } }
      }
    ) {
      id
      description
      weaknesses
      strengths
      name
      position
      number
    }
  }
`;

export default function CreatePlayer() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: '',
    description: '',
    weaknesses: '',
    strengths: '',
    number: '#',
  });

  const me = useUser();
  const currentUserTeamId = me?.team?.id;

  const [createPlayer, { loading, error, data }] = useMutation(
    CREATE_PLAYER_MUTATION,
    {
      variables: { ...inputs, currentUserTeamId },
      refetchQueries: [{ query: ALL_PLAYERS_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // submit the inputsfiled to the backend
        const res = await createPlayer();
        clearForm();
        Router.push({
          pathname: `/player/${res.data.createPlayer.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
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
        <label htmlFor="number">
          Number
          <input
            type="text"
            id="number"
            name="number"
            placeholder="Number"
            value={inputs.number}
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
        <label htmlFor="weaknesses">
          Weaknesses
          <textarea
            id="weaknesses"
            name="weaknesses"
            placeholder="Weaknesses"
            onChange={handleChange}
            value={inputs.weaknesses}
          />
        </label>
        <label htmlFor="strengths">
          Strengths
          <textarea
            id="strengths"
            name="strengths"
            placeholder="Strengths"
            onChange={handleChange}
            value={inputs.strengths}
          />
        </label>
        <label htmlFor="position">
          Position
          <select
            id="position"
            name="position"
            placeholder="Position"
            onChange={handleChange}
          >
            <option value="OL">OL</option>
            <option value="RB">RB</option>
            <option value="WR">WR</option>
            <option value="DL">DL</option>
            <option value="LB">LB</option>
            <option value="DB">DB</option>
            <option value="Point Guard">Point Guard</option>
            <option value="Shooting Guard">Shooting Guard</option>
            <option value="Small Forward">Small Forward</option>
            <option value="Power Forward">Power Forward</option>
            <option value="Center">Center</option>
            <option value="Pitcher">Pitcher</option>
            <option value="Catcher">Catcher</option>
            <option value="First Base">First Base</option>
            <option value="Second Base">Second Base</option>
            <option value="Third Base">Third Base</option>
            <option value="Shortstop">Shortstop</option>
            <option value="Outfield">Outfield</option>
            <option value="Forward">Forward</option>
            <option value="Defenseman">Defenseman</option>
            <option value="Goalie">Goalie</option>
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Forward">Forward</option>
          </select>
        </label>
        <button type="submit">+ Add Player</button>
      </fieldset>
    </Form>
  );
}
