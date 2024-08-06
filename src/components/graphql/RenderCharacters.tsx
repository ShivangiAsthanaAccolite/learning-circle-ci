import { gql, useQuery } from "@apollo/client";

import React from "react";
import { useNavigate } from "react-router-dom";

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

const RenderCharacters: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  const CharacterCard = ({ character }: { character: any }) => {
    return (
      <div
        style={{
          border: "1px solid #111",
          borderRadius: "8px",
          padding: "10px",
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => handleClick(`/characters/${character.id}`)}
      >
        <img
          src={character.image}
          alt={character.name}
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <h2 style={{ fontSize: "1.2em", margin: "10px 0" }}>
          {character.name}
        </h2>
        <p>{character.species}</p>
        <p>{character.status}</p>
      </div>
    );
  };

  if (loading) {
    return <p>Loading...</p>; // Return a JSX element for loading state
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Return a JSX element for error state
  }

  const characters = data.characters.results;

  return (
    <div style={{ margin: 20 }}>
      <h1>All Characters</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {characters &&
          characters.map((character: any) => (
            <CharacterCard
              key={character.id.toString()}
              character={character}
            />
          ))}
      </div>
    </div>
  );
};

export default RenderCharacters;
