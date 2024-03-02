import mongoose from 'mongoose';
import {Item} from '../../types/DBtypes';

const itemModel = new mongoose.Schema<Item>({
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
    ref: 'User',
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  date_found: {
    type: Date,
  },
  date_posted: {
    type: Date,
  },
  description: {
    type: String,
    required: true,
  },
    identifiers: {
        type: [String],
    },
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
});

export default mongoose.model<Item>('Item', itemModel);

