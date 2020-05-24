import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const ArtistProfile = ({ data }) => {
  const { name, bio, artworks } = data;
  const useStyles = makeStyles({
    root: {
      width: 345,
    },
    media: {
      height: 140,
    },
  });
  const classes = useStyles();

  return (
    <Box>
      <Button to="/" component={Link}>
        Back
      </Button>
      <Typography gutterBottom variant="h1">
        {name}
      </Typography>
      <Typography variant="h3">{bio}</Typography>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        {artworks.map(({ id, title, imageUrl, date, description }) => (
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
                <Typography variant="body2" color="textSecondary" component="p">
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
