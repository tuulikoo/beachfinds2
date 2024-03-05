import { Post } from '../../types/DBtypes';
import tagModel from '../models/tagModel';

export const tagResolver = {
  Post: {
    tags: async (parent: Post) => {
      return await tagModel.find({ _id: { $in: parent.tags } });
    },
  },
  Query: {
    allTags: async () => {return await tagModel.find();},
    tagById: async (_parent: undefined, { id }: { id: string }) => {
      return await tagModel.findById(id);
    },
  },

  Mutation: {
    createTag: async (_parent: undefined, { label }: { label: string }) => {
      return await tagModel.create({ label });
    },
    deleteTag: async (_parent: undefined, { id }: { id: string }) => {
      return await tagModel.findByIdAndDelete(id);
    }
  }
};
