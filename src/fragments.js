import { gql } from "apollo-boost";

export default {
  artistFull: gql`
    fragment ARTIST on Artist {
      imageUrl
      bio
      gender
      birthday
      deathday
      location
      sales {
        id
        artworks {
          id
        }
      }
      artworks {
        id
        title
        imageUrl
        date
      }
    }
  `,
};
