import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Box, Button, Typography } from "@material-ui/core";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { ArtistProfileWithQuery as ArtistProfile } from "../ArtistProfile";

const Artists = () => {
  const ARTIST_NAMES_1 = gql`
    {
      artists(size: 100, page: 10) {
        id
        name
      }
    }
  `;
  const ARTIST_NAMES_2 = gql`
    {
      artists(size: 100, page: 11) {
        id
        name
      }
    }
  `;

  const { loading, error, data: page1 } = useQuery(ARTIST_NAMES_1);
  const { loading: page2Loading, error: page2Error, data: page2 } = useQuery(
    ARTIST_NAMES_2
  );

  const match = useRouteMatch();
  if (loading || page2Loading) return <p>Loading...</p>;
  if (error || page2Error) return <p>Error :(</p>;
  const artists = page1.artists.concat(page2.artists);
  return (
    <>
      <Switch>
        <Route exact path={match.path}>
          <Box p={4}>
            <Typography variant="h1">Artists</Typography>
            <Typography variant="h2">
              Click on an Artist to view their profile
            </Typography>
            <Box display="flex" flexWrap="wrap">
              {artists.map(({ name, id }) => (
                <Box m={2} key={id}>
                  <Button variant="contained" m={2} p={3} component={Link}>
                    <Link to={`${match.path}/${id}`}>{name}</Link>
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Route>
        <Route
          path={`${match.path}/:id`}
          render={({ match }) => {
            if (artists) {
              return (
                <ArtistProfile
                  id={artists.find(({ id }) => id === match.params.id).id}
                />
              );
            }
          }}
        />
      </Switch>
    </>
  );
};

export default Artists;
