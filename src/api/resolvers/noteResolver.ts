import { UpdateQuery } from 'mongoose';
import noteModel from '../models/noteModel';
import { Note } from '../../App';

export const noteResolver = {
  Query: {
    noteById: async (_parent: undefined, { id }: { id: string }) => {
      return await noteModel.findById(id).populate('tags');
    },
    allNotes: async () => {
      return await noteModel.find().populate('tags');
    },
    notesByTag: async (_parent: undefined, { tagId }: { tagId: string }) => {
      return await noteModel.find({ tags: tagId }).populate('tags');
    },
  },
Mutation: {
    createNote: async (_parent: undefined, { input }: { input: unknown }) => {
        return await noteModel.create(input);
    },
    updateNote: async (_parent: undefined, { id, input }: { id: string; input: UpdateQuery<Note> | undefined }) => {
        return await noteModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteNote: async (_parent: undefined, { id }: { id: string }) => {
        return await noteModel.findByIdAndDelete(id);
    },
},
};
