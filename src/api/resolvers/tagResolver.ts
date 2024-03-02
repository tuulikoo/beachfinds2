import tagModel from '../models/tagModel';

export const tagResolver = {
  Query: {
    // If you need to fetch tags directly, you can add those queries here.
  },
  Mutation: {
    createTag: async (_parent: undefined, { label }: { label: string }) => {
      return await tagModel.create({ label });
    },
    updateTag: async (_parent: undefined, { id, label }: { id: string; label: string }) => {
      return await tagModel.findByIdAndUpdate(id, { label }, { new: true });
    },
    deleteTag: async (_parent: undefined, { id }: { id: string }) => {
      return await tagModel.findByIdAndDelete(id);
    },
  },
};
