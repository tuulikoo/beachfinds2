import { GraphQLError } from "graphql";
import postModel from "../models/postModel.js";
import { Post, LocationInput } from "../../types/DBtypes.js";
import { MyContext } from "../../types/MyContext.js";
import { isLoggedIn } from "../../functions/authorize.js";

export default {
  Query: {
    posts: async () => {
      return await postModel.find().populate("tags").populate("owner");
    },
    postById: async (_parent: undefined, args: { id: string }) => {
      return await postModel
        .findById(args.id)
        .populate("tags")
        .populate("owner");
    },
    postsByArea: async (_parent: undefined, args: LocationInput) => {
      const rightCorner = [args.topRight.lng, args.topRight.lat];
      const leftCorner = [args.bottomLeft.lng, args.bottomLeft.lat];
      // Populate both 'tags' and 'owner' fields
      return await postModel
        .find({
          location: {
            $geoWithin: {
              $box: [leftCorner, rightCorner],
            },
          },
        })
        .populate("tags")
        .populate("owner");
    },
    postsByOwner: async (_parent: undefined, args: { ownerId: string }) => {
      return await postModel.find({ owner: args.ownerId }).populate("tags");
    },
  },
  Mutation: {
    createPost: async (
      _parent: undefined,
      args: { input: Omit<Post, "id"> },
      context: MyContext
    ) => {
      isLoggedIn(context);
      args.input.owner = context.userdata?.user.id;
      return await postModel.create(args.input);
    },
    updatePost: async (
      _parent: undefined,
      args: { id: string; input: Partial<Omit<Post, "id">> },
      context: MyContext
    ) => {
      isLoggedIn(context);
      const post = await postModel.findById(args.id);
      if (
        context.userdata?.user.role === "admin" ||
        context.userdata?.user.id === post?.owner.toString()
      ) {
        return await postModel.findByIdAndUpdate(args.id, args.input, {
          new: true,
        });
      } else {
        throw new GraphQLError("Not authorized");
      }
    },
    deletePost: async (
      _parent: undefined,
      args: { id: string },
      context: MyContext
    ) => {
      isLoggedIn(context);
      if (context.userdata?.user.role === "admin") {
        return await postModel.findByIdAndDelete(args.id);
      } else {
        const filter = { _id: args.id, owner: context.userdata?.user.id };
        return await postModel.findOneAndDelete(filter);
      }
    },
  },
};
