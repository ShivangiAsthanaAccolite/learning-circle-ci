// src/App.js
import "./App.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CharacterDetail from "./components/graphql/CharacterDetail";
import Main from "./components/Main";
import React from "react";
import RenderCharacters from "./components/graphql/RenderCharacters";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  console.log("in app");
  return (
    <ApolloProvider client={client}>
      <div>
        {/* <h1>App Component</h1> */}
        <Router>
          <nav
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1000, // Optional: Ensure the header stays on top of other content
              backgroundColor: "black",
            }}
          >
            <ul
              style={{
                listStyleType: "none",
                padding: 10,
                display: "flex",
                flexDirection: "row",
                margin: 0, // Remove default margin
              }}
            >
              <li style={{ padding: 20, backgroundColor: "white", margin: 5 }}>
                <a
                  href="/"
                  style={{
                    color: "black",
                    fontSize: 20,
                    textDecoration: "none",
                  }}
                >
                  Home
                </a>
              </li>
              <li style={{ padding: 20, backgroundColor: "white", margin: 5 }}>
                <a
                  href="/characters"
                  style={{
                    color: "black",
                    fontSize: 20,
                    textDecoration: "none",
                  }}
                >
                  Characters
                </a>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/characters" element={<RenderCharacters />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
