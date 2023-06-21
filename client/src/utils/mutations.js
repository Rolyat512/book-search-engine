import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

 // wasn't sure about the saved books section on line 30 or remove book 

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $savedBooks: String!) {
    saveBook(userId: $userId, book: $savedBooks) {
      _id
      name
      savedBooks
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($savedBooks: String!) {
    removeBook(book: $savedBooks) {
      _id
      name
      savedBooks
    }
  }
`;

