import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import Artists from "./Artists";
// import { createHttpLink } from "apollo-link-http";
// import { setContext } from "apollo-link-context";
// import { InMemoryCache } from "apollo-cache-inmemory";

// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const xAccessToken =
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWM1OGFhNjk0YzJmMjAwMGViYjFiMWMiLCJzYWx0X2hhc2giOiI1NWVkZWQ2NTBmZWU3NGI3MjVjNDk0NzM4MTgzOWY1MCIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwib3RwIjpmYWxzZSwiZXhwIjoxNTk1MTg4MzkyLCJpYXQiOjE1OTAwMDQzOTIsImF1ZCI6IjVkNDA5OTZlNmU2MDQ5MDAwNzQ5MGZhMiIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1ZWM1OGFhODk0YzJmMjAwMTIxNTVhOWMifQ.T0OjY21kZk-XEl-82i9ltvCeWS78CltX9sDdOy7VVJk";
//   const xUserId = "5ec58aa694c2f2000ebb1b1c";
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: xAccessToken, xUserId
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  uri: "https://metaphysics-staging.artsy.net/",
});

const POPULAR_ARTISTS = gql`
  {
    popular_artists {
      artists {
        name
      }
    }
  }
`;

const { loading, error, data } = useQuery(POPULAR_ARTISTS);

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Artists data={data} loading={loading} error={error} />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
