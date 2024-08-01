import "./App.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// import logo from "./logo.svg";
import Main from "./components/Main";
import React from "react";
import RenderCharacters from "./components/graphql/RenderCharacters";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>App Component</h1>
        <Main />
        <RenderCharacters />
      </div>
    </ApolloProvider>
  );
}
export default App;
