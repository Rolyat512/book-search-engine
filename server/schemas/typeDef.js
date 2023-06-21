const { gql } = require('apollo-server-express');

// Didn't know how to do savedBooks (this will be an array of the Book Type)
// Didn't know what to put for the image or the link 
// Do I need a password under the User type?
// Need to add to the Query section here 
// Need to add to the saveBook mutation 
    // Should I create an input type for this? 

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Integer 
        savedBooks: [Book]!
    }

    type Book {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: 
        link:
    }

    type Auth {
        token: ID!
        user: User
    }

    input bookSave {
        
    }

    type Query {
        users: [User]!
        user(userId: ID!): User
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook([Book]!, descrition: String!, title: String!, bookId: ID!, ): User 
        removeBook(bookId: ID!): User 
    }

`