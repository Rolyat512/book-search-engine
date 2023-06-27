import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query myQuery {
    me {
      _id
      savedBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;