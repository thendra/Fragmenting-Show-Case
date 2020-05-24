import React from "react";
import { Box, Card } from "@material-ui/core";

const Artists = ({ data, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Box display="flex" flexWrap="wrap" p={4}>
      {data.popular_artists.artists.map(({ name }) => (
        <Box m={2}>
          <Card raised>
            <p>{name}</p>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default Artists;
