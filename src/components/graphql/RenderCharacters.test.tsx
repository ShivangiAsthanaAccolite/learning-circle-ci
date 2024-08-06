import RenderCharacters, { GET_CHARACTERS } from "./RenderCharacters";
import { render, screen } from "@testing-library/react";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

// Mock the useQuery hook from Apollo Client
jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useQuery: jest.fn(),
}));

const mockCharactersData = {
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
      // Add additional character objects here if needed
    ],
  },
};

describe("RenderCharacters Component", () => {
  it("displays loading state initially", () => {
    (useQuery as jest.Mock).mockReturnValue({ loading: true });
    render(<RenderCharacters />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      error: new Error("Failed to fetch"),
    });
    render(<RenderCharacters />);
    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });

  it("displays characters data", () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockCharactersData });
    render(<RenderCharacters />);
    expect(screen.getByText("All Characters")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.getByText("Summer Smith")).toBeInTheDocument();
    // Add more assertions as needed
  });
});
