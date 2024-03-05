import {GraphQLError} from 'graphql';
import {Item, User, UserInput, UserOutput} from '../../types/DBtypes'; //TokenContent should be used
import fetchData from '../../functions/fetchData';
import {LoginResponse, UserResponse} from '../../types/MessageTypes'; //LoginResponse should be used
import {isLoggedIn} from '../../functions/authorize';
import {MyContext} from '../../types/MyContext';

export default {
  Item: {
    owner: async (parent: Item) => {
      return await fetchData<User>(
        `${process.env.AUTH_URL}/users/${parent.owner}`,
      );
    },
  },
  Query: {

    users: async () => {
      return await fetchData<User[]>(`${process.env.AUTH_URL}/users`);
    },
    userById: async (_parent: undefined, args: {id: string}) => {
      return await fetchData<User>(`${process.env.AUTH_URL}/users/${args.id}`);
    },
    checkToken: async (_parent: undefined, context: MyContext) => {
      return await {user: context.userdata?.user};
    },
  },
  Mutation: {
    register: async (_parent: undefined, args: {user: UserInput}) => {
        return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args.user),
        });
      },
      login: async (
        _parent: undefined,
        args: {credentials: {username: string; password: string}},
      ) => {
        // Log the credentials received to verify they are what you expect
        console.log("Attempting login with credentials:", args.credentials);
      
        try {
          const response = await fetchData<LoginResponse>(
            `${process.env.AUTH_URL}/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(args.credentials),
            },
          );
      
          // Log the response from the server
          console.log("Login response:", response);
      
          return response;
        } catch (error) {
          // Log any errors that occur during the fetch
          console.error("Error during login:", error);
          throw new GraphQLError('Error during login');
        }
      },
    updateUser: async (
      _parent: undefined,
      args: {user: UserOutput},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${context.userdata?.token}`,
        },
        body: JSON.stringify(args.user),
      });
    },
    deleteUser: async (
      _parent: undefined,
      _args: undefined,
      context: MyContext,
    ) => {
      isLoggedIn(context);
      return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${context.userdata?.token}`,
        },
      });
    },
    updateUserAsAdmin: async (
      _parent: undefined,
      args: {user: UserOutput; id: string},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      if (context.userdata?.user.role === 'admin') {
        return await fetchData<UserResponse>(
          `${process.env.AUTH_URL}/users/${args.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${context.userdata?.token}`,
            },
            body: JSON.stringify(args.user),
          },
        );
      } else {
        throw new GraphQLError('Not authorized');
      }
    },
    deleteUserAsAdmin: async (
      _parent: undefined,
      args: {id: string},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      if (context.userdata?.user.role === 'admin') {
        return await fetchData<UserResponse>(
          `${process.env.AUTH_URL}/users/${args.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${context.userdata?.token}`,
            },
          },
        );
      } else {
        throw new GraphQLError('Not authorized');
      }
    },
  },


};