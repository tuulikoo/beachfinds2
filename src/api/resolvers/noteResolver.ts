import { UpdateQuery } from 'mongoose';
import noteModel from '../models/noteModel';
import { Note } from '../../types/DBtypes';
import { MyContext } from '../../types/MyContext';
import { isLoggedIn } from '../../functions/authorize';

export default {
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
  createNote: async (
    _parent: undefined,
    args: { input: Omit<Note, 'id'> },
    context: MyContext
  ) => {
    const ownerId = context.userdata?.user.id;
    args.input.owner = ownerId;
    isLoggedIn(context);
    console.log('context', context.userdata?.user.id);
    // Retrieve the owner ID from the authenticated user

    
    // Assign the owner ID to the note input
    
    // Create the note
    return await noteModel.create(args.input);
  },
    updateNote: async (_parent: undefined, { id, input }: { id: string; input: UpdateQuery<Note> | undefined }) => {
        return await noteModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteNote: async (_parent: undefined, { id }: { id: string }) => {
        return await noteModel.findByIdAndDelete(id);
    },
},
};