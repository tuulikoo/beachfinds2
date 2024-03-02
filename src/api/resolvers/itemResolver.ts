import {GraphQLError} from 'graphql';
import itemModel from '../models/itemModel';
import {Item, LocationInput} from '../../types/DBtypes';
import {MyContext} from '../../types/MyContext';
import {isLoggedIn} from '../../functions/authorize';

// TODO: create resolvers based on cat.graphql
// note: when updating or deleting a cat, you need to check if the user is the owner of the cat
// note2: when updating or deleting a cat as admin, you need to check if the user is an admin by checking the role from the user object
// note3: updating and deleting resolvers should be the same for users and admins. Use if statements to check if the user is the owner or an admin

export default {
  Query: {
    items: async () => {
      return await itemModel.find();
    },
    itemById: async (_parent: undefined, args: {id: string}) => {
      return await itemModel.findById(args.id);
    },
    itemsByArea: async (_parent: undefined, args: LocationInput) => {
      const rightCorner = [args.topRight.lng, args.topRight.lat];
      const leftCorner = [args.bottomLeft.lng, args.bottomLeft.lat];
      return await itemModel.find({
        location: {
          $geoWithin: {
            $box: [leftCorner, rightCorner],
          },
        },
      });
    },
    itemsByOwner: async (_parent: undefined, args: {ownerId: string}) => {
      return await itemModel.find({owner: args.ownerId});
    },
  },
  Mutation: {
    createItem: async (
      _parent: undefined,
      args: {input: Omit<Item, 'id'>},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      args.input.owner = context.userdata?.user.id;
      return await itemModel.create(args.input);
    },
    updateItem: async (
      _parent: undefined,
      args: {id: string; input: Partial<Omit<Item, 'id'>>},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      const item = await itemModel.findById(args.id);
      if (
        context.userdata?.user.role === 'admin' ||
        context.userdata?.user.id === item?.owner.toString()
      ) {
        return await itemModel.findByIdAndUpdate(args.id, args.input, {
          new: true,
        });
      } else {
        throw new GraphQLError('Not authorized');
      }
    },
    deleteItem: async (
      _parent: undefined,
      args: {id: string},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      if (context.userdata?.user.role === 'admin') {
        return await itemModel.findByIdAndDelete(args.id);
      } else {
        const filter = {_id: args.id, owner: context.userdata?.user.id};
        return await itemModel.findOneAndDelete(filter);
      }
    },
  },
};
