const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

// Not sure if the code below is correct. Copied and modified from class code?

const resolvers = {
	Query: {
		// By adding context to our query, we can retrieve the logged in user without specifically searching for them
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
				return userData;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
	},

	Mutation: {
		login: async (parent, { email,password} ) => {
			const user = await User.findOne({email});
			if (!user) throw new AuthenticationError("Incorrect credentials");
			
			const correctPW = await User.isCorrectPassword(password);
			if (!correctPW) throw new AuthenticationError("Incorrect credentials");
			
			const token = signToken(user);
			return {token, user};
		},

		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return {token, user};
		},
		saveBook: async (parent, {bookData}, context) => {
			if(context.user) {
				const updateUser = await User.findByIdAndUpdate(
					{_id: context.user._id},
					{$push: {savedBooks: bookData}},
					{new: true }
				);

				return updateUser;
			}; 

			throw new AuthenticationError("You need to login!")
		},
		removeBook: async (parent, { bookId }, context) => {
			if (context.user){
				const updateUser = await User.findOneAndUpdate(
					{_id: context.user._id},
					{$pull: {savedBooks: {bookId}}},
					{new: true}
				);

				return updateUser;
			};

			throw new AuthenticationError("You need to login!")
		}
	},
};

module.exports = resolvers;
