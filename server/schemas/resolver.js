const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');


// Not sure if the code below is correct 

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('savedBooks');
          },
          user: async (parent, { username }) => {
            return User.findOne({ username }).populate('savedBooks');
          },
          books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ createdAt: -1 });
          },
          book: async (parent, { bookId }) => {
            return Book.findOne({ _id: bookId });
          },
          me: async (parent, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },

    Mutation: {

    }
}