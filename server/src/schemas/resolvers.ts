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
    input: {
        username: string;
        email: string;
        password: string;
    }
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
        login: async (_parent: any, { input }: LoginArgs) => {
            const user = await User.findOne({ email: input.email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(input.password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },
        addUser: async (_parent: any, { input }: CreateUserArgs) => {
            const user = await User.create(input);
            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        }
    }
}

export default resolvers