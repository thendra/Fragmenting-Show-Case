import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "https://metaphysics-staging.artsy.net/",
});

client
  .query({
    query: gql`
      {
        popular_artists {
          artists {
            name
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
