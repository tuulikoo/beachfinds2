import { Post } from "../../types/DBtypes.js";
import tagModel from "../models/tagModel.js";

export const tagResolver = {
  Post: {
    tags: async (parent: Post) => {
      return await tagModel.find({ _id: { $in: parent.tags } });
    },
  },
  Query: {
    allTags: async () => {
      return await tagModel.find();
    },
    tagById: async (_parent: undefined, { id }: { id: string }) => {
      return await tagModel.findById(id);
    },
  },

  Mutation: {
    createTag: async (_parent: undefined, { label }: { label: string }) => {
      const existingTag = await tagModel.findOne({ label });

      if (existingTag) {
        return existingTag;
      } else {
        return await tagModel.create({ label });
      }
    },
    updateTag: async (
      _parent: undefined,
      { id, label }: { id: string; label: string }
    ) => {
      const updatedTag = await tagModel.findByIdAndUpdate(
        id,
        { label },
        { new: true }
      );
      if (!updatedTag) {
        throw new Error(`Tag with ID ${id} not found`);
      }
      return updatedTag;
    },
    deleteTag: async (_parent: undefined, { id }: { id: string }) => {
      return await tagModel.findByIdAndDelete(id);
    },
  },
};
