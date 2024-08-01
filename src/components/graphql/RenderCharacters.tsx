import { gql, useQuery } from "@apollo/client";

import React from "react";

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      info {
        count
      }
      results {
        id
        name
        status
        species
        gender
        origin {
          name
          dimension
        }
        image
      }
    }
  }
`;

const CharacterInfo = ({ character }: { character: any }) => {
  return (
    <div>
      <li>{character.name}</li>
    </div>
  );
};

const RenderCharacters: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) {
    return <p>Loading...</p>; // Return a JSX element for loading state
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Return a JSX element for error state
  }

  const characters = data.characters.results;

  return (
    <div>
      <h1>All Characters</h1>
      <ul>
        {characters &&
          characters.map((character: any) => (
            <CharacterInfo
              key={character.id.toString()}
              character={character}
            />
          ))}
      </ul>
    </div>
  );
};

export default RenderCharacters;
