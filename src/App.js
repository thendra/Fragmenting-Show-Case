import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Artists, { ArtistsSplitQuery } from "./Artists";
import { Box, Button } from "@material-ui/core";
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

const App = () => {
  const client = new ApolloClient({
    uri: "https://metaphysics-staging.artsy.net/",
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Box px={5}>
          <Box display="flex">
            <Button
              component={Link}
              to="/with-splitting"
              variant="contained"
              color="error"
            >
              With query splitting
            </Button>
            <Button component={Link} to="/" variant="contained" color="warning">
              Without query splitting
            </Button>
          </Box>
          <Switch>
            <Route path="/with-splitting">
              <ArtistsSplitQuery />
            </Route>
            <Route path="/">
              <Artists />
            </Route>
          </Switch>
        </Box>
      </Router>
    </ApolloProvider>
  );
};

export default App;
