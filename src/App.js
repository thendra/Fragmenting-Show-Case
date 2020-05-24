import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Artists, { ArtistsSplitQuery } from "./Artists";
import { Box, Button, Typography, makeStyles } from "@material-ui/core";
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
  const useStyles = makeStyles({
    blockButton: {
      width: "100%",
      height: "100%",
    },
  });

  const client = new ApolloClient({
    uri: "https://metaphysics-staging.artsy.net/",
  });

  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <Router>
        <Box px={5}>
          <Box display="flex">
            <Button component={Link} to="/">
              Home
            </Button>
          </Box>
          <Switch>
            <Route path="/with-fragmenting">
              <ArtistsSplitQuery />
            </Route>
            <Route path="/without-fragmenting">
              <Artists />
            </Route>
            <Route path="/">
              <Typography variant="h1">Data fragmenting demo</Typography>
              <Typography>
                This Art catelogue app aims to show how splitting up how you
                pull data into your application can have a big effect on the
                user experience of your app.
              </Typography>
              <Typography>
                Clicking the left button will take you the app where the data
                for all the artists is pulled in on initial rendering of the
                app, whereas the button on the right will take you to the app
                where only the data required for that page is pulled in on
                render.
              </Typography>
              <Box display="flex" pt={4}>
                <Box width="50%" height="200px">
                  <Button
                    className={classes.blockButton}
                    color="secondary"
                    component={Link}
                    to="/without-fragmenting"
                    variant="contained"
                  >
                    Fetch Artists Without Fragmenting
                  </Button>
                </Box>
                <Box width="50%" height="200px">
                  <Button
                    className={classes.blockButton}
                    component={Link}
                    color="primary"
                    to="/with-fragmenting"
                    variant="contained"
                  >
                    Fetch Artists With Fragmenting
                  </Button>
                </Box>
              </Box>
            </Route>
          </Switch>
        </Box>
      </Router>
    </ApolloProvider>
  );
};

export default App;
