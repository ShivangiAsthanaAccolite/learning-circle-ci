import RenderCharacters, { GET_CHARACTERS } from "./RenderCharacters";
import { render, screen, waitFor } from "@testing-library/react";

import { MockedProvider } from "@apollo/client/testing";
import React from "react";

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
    },
    result: {
      data: {
        characters: {
          results: [
            {
              id: "1",
              name: "Rick Sanchez",
              status: "Alive",
              species: "Human",
              gender: "Male",
              origin: {
                name: "Earth (C-137)",
                dimension: "Dimension C-137",
              },
              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            },
            {
              id: "2",
              name: "Morty Smith",
              status: "Alive",
              species: "Human",
              gender: "Male",
              origin: {
                name: "unknown",
                dimension: null,
              },
              image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            },
            // Add additional character objects here
            {
              id: "3",
              name: "Summer Smith",
              status: "Alive",
              species: "Human",
              gender: "Female",
              origin: {
                name: "Earth (Replacement Dimension)",
                dimension: "Replacement Dimension",
              },
              image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
            },
            // ... other characters
          ],
        },
      },
    },
  },
];

test("renders RenderCharacters component", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RenderCharacters />
    </MockedProvider>
  );

  // Check for the loading state
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  // Wait for the results to be rendered
  await waitFor(() =>
    expect(screen.getByText("All Characters")).toBeInTheDocument()
  );

  // Check if specific characters are rendered
  expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  expect(screen.getByText("Summer Smith")).toBeInTheDocument();
  // Add more assertions as needed
});
