import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Box, Button, Typography } from "@material-ui/core";
import { Switch, Route, Link } from "react-router-dom";
import ArtistProfile from "../ArtistProfile";

const Artists = () => {
  const POPULAR_ARTISTS = gql`
    {
      artists(size: 100, page: 10) {
        id
        name
        bio
        artworks {
          id
          title
          imageUrl
          date
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(POPULAR_ARTISTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const artists = data.artists;
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Box p={4}>
            <Typography variant="h1">Artists</Typography>
            <Typography variant="h2">
              Click on an Artist to view their profile
            </Typography>
            <Box display="flex" flexWrap="wrap">
              {artists.map(({ name, id }) => (
                <Box m={2} key={id}>
                  <Button variant="contained" m={2} p={3} component={Link}>
                    <Link to={`/${id}`}>{name}</Link>
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Route>
        <Route
          path={`/:id`}
          render={({ match }) => {
            if (artists) {
              return (
                <ArtistProfile
                  data={artists.find(({ id }) => id === match.params.id)}
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
