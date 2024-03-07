import mongoose from 'mongoose';
import {Post} from '../../types/DBtypes';

const postModel = new mongoose.Schema<Post>({
  item_name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Shells', 'Seaglass', 'Fossils', 'Stones', 'Driftwood', 'Misc'],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
}, { timestamps: true });

export default mongoose.model<Post>('Post', postModel);

