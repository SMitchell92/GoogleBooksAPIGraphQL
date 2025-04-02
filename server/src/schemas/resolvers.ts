import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';
import type { BookDocument } from '../models/Book.js';

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    savedBooks: BookDocument[];
    isCorrectPassword(password: string): Promise<boolean>;
    bookCount: number;
}

// interface UserArgs {
//     userID: string;
// }

interface CreateUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    }
}

interface LoginArgs {
        username: string;
        email: string;
        password: string;
}

interface Context {
    user?: User;
}

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: Context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks');

                return userData;
            }
            throw new Error('Not logged in');
        }
    },
    Mutation: {
        login: async (_parent: any, { email, password }: LoginArgs) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },
        addUser: async (_parent: any, { input }: CreateUserArgs) => {
            console.log("input:" , input)
            const user = await User.create(input);
            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },
        saveBook: async (_parent: any, { bookId, authors, description, title, image, link }: any, context: Context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: { bookId, authors, description, title, image, link } } },
                    { new: true, runValidators: true }
                ).populate('savedBooks');

                return updatedUser;
            }
            throw new AuthenticationError('Not logged in');
        },
        removeBook: async (_parent: any, { bookId }: any, context: Context) => {
            if (!context.user) {
                throw new AuthenticationError('Not logged in');
            }

            const updatedUser = await User.findOneAndDelete(
                { _id: context.user._id },
                { $removefromSet: { savedBooks: { bookId } } }
            ).populate('savedBooks');

            return updatedUser;
        }
    }
}

export default resolvers