import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/react-hooks";
import fragments from "../fragments";

const ArtistProfile = ({ id }) => {
  const ARTIST_BY_ID = gql`
    query ARTISTBYID($id: String!) {
      artist(id: $id) {
        id
        name
        ...ARTIST
      }
    }
    ${fragments.artistFull}
  `;
  const useStyles = makeStyles({
    root: {
      width: 345,
    },
    media: {
      height: 140,
    },
    avatar: {
      width: "200px",
      height: "200px",
      marginRight: "50px",
    },
  });
  const classes = useStyles();
  const { loading, error, data } = useQuery(ARTIST_BY_ID, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    name,
    bio,
    artworks,
    gender,
    birthday,
    deathday,
    location,
    imageUrl,
  } = data.artist;

  return (
    <Box>
      <Button to="/with-fragmenting" component={Link}>
        Back
      </Button>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
        mb={3}
        mx={-5}
        bgcolor="violet"
      >
        <Avatar alt="Remy Sharp" src={imageUrl} className={classes.avatar} />
        <Typography variant="h1">{name}</Typography>
      </Box>
      <Typography variant="h3">{bio}</Typography>
      <Typography variant="h4">Gender: {gender}</Typography>
      <Typography variant="h4">Year of birth: {birthday}</Typography>
      <Typography variant="h4">Year of death: {deathday || "N/A"}</Typography>
      <Typography variant="h4">Location: {location}</Typography>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        {artworks &&
          artworks.map(({ id, title, imageUrl, date, description }) => (
            <Card key={id} className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={imageUrl}
                  title={title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="caption">
                    {date}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default ArtistProfile;
