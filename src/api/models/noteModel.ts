import mongoose from 'mongoose';
import {Note} from '../../types/DBtypes'

const noteModel = new mongoose.Schema<Note>({
  title: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<Note>('Note', noteModel);
