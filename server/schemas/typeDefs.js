const { gql } = require('apollo-server-express');

// Didn't know how to do savedBooks (this will be an array of the Book Type)
// Didn't know what to put for the image or the link 
// Do I need a password under the User type?
// Need to add to the Query section here 
// Need to add to the saveBook mutation 
    // Should I create an input type for this? 

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        title: String!
        image: String
        link: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User 
        removeBook(bookId: ID!): User 
    }
`;

module.exports = typeDefs;