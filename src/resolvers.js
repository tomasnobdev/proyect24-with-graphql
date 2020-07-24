import { tasks } from './sample';

import User from './models/User';

export const resolvers = {
	Query: {
		hello: () => {
			return 'Hello World with Graphql'
		},
		greet: (root, { name }, ctx) => {
			console.log(ctx);
			return `Good Morning Sir ${name}`
		},
		tasks: () => {
			return tasks;
		},
		Users: async () => {
			return await User.find();
	}
	},
	Mutation: {
		createTask: (_, { input }) => {
			input._id = tasks.length;
			tasks.push(input);
			return input;
		},
		createUser: async (_, { input }) => {
			const newUser = new User(input)
			await newUser.save();
			return newUser;
		},
		deleteUser: async (_, { _id }) => {
			return await User.findByIdAndDelete(_id);
		},
		updateUser: async (_, { _id, input }) => {
			return await User.findByIdAndUpdate(_id, input, { new: true });
		}
	}
};