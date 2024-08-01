import { gql, useQuery } from "@apollo/client";

import React from "react";
import { useParams } from "react-router-dom";

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        type
        dimension
      }
      location {
        id
        name
        type
        dimension
      }
      image
      created
      episode {
        id
        name
        air_date
        episode
        created
      }
    }
  }
`;

const CharacterDetail = () => {
  const { id } = useParams(); // Get the `id` from the URL parameters

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id }, // Pass the `id` variable to the query
  });

  if (loading) {
    return <p>Loading...</p>; // Return a JSX element for loading state
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Return a JSX element for error state
  }

  const character = data.character;

  return (
    <div style={{ margin: 20 }}>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default CharacterDetail;
