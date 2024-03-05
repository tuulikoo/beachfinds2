import {GraphQLError} from 'graphql';
import postModel from '../models/postModel';
import {Post, LocationInput} from '../../types/DBtypes';
import {MyContext} from '../../types/MyContext';
import {isLoggedIn} from '../../functions/authorize';


export default {
  Query: {
    posts: async () => {
      return await postModel.find();
    },
    postById: async (_parent: undefined, args: {id: string}) => {
      return await postModel.findById(args.id);
    },
    postsByArea: async (_parent: undefined, args: LocationInput) => {
      const rightCorner = [args.topRight.lng, args.topRight.lat];
      const leftCorner = [args.bottomLeft.lng, args.bottomLeft.lat];
      return await postModel.find({
        location: {
          $geoWithin: {
            $box: [leftCorner, rightCorner],
          },
        },
      });
    },
    postsByOwner: async (_parent: undefined, args: {ownerId: string}) => {
      return await postModel.find({owner: args.ownerId});
    },
  },
  Mutation: {
    createPost: async (
      _parent: undefined,
      args: {input: Omit<Post, 'id'>},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      args.input.owner = context.userdata?.user.id;
      return await postModel.create(args.input);
    },
    updatePost: async (
      _parent: undefined,
      args: {id: string; input: Partial<Omit<Post, 'id'>>},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      const post = await postModel.findById(args.id);
      if (
        context.userdata?.user.role === 'admin' ||
        context.userdata?.user.id === post?.owner.toString()
      ) {
        return await postModel.findByIdAndUpdate(args.id, args.input, {
          new: true,
        });
      } else {
        throw new GraphQLError('Not authorized');
      }
    },
    deletePost: async (
      _parent: undefined,
      args: {id: string},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      if (context.userdata?.user.role === 'admin') {
        return await postModel.findByIdAndDelete(args.id);
      } else {
        const filter = {_id: args.id, owner: context.userdata?.user.id};
        return await postModel.findOneAndDelete(filter);
      }
    },
  },
};
