import mongoose from 'mongoose';
import {Tag} from '../../types/DBtypes';

const tagModel = new mongoose.Schema<Tag>({
  label: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Tag>('Tag', tagModel);
