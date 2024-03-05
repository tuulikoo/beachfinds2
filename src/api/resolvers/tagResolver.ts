import tagModel from '../models/tagModel';

export const tagResolver = {
  Query: {
    allTags: async () => {return await tagModel.find();},
    tagById: async (_parent: undefined, { id }: { id: string }) => {
      return await tagModel.findById(id);
    }, // <--- Added missing closing bracket
  }, // <--- Added missing closing bracket

  Mutation: {
    createTag: async (_parent: undefined, { label }: { label: string }) => {
      return await tagModel.create({ label });
    },
    deleteTag: async (_parent: undefined, { id }: { id: string }) => {
      return await tagModel.findByIdAndDelete(id);
    }
  }
};
