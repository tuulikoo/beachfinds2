import mongoose from 'mongoose';

interface Tag {
  label: string;
}

const tagSchema = new mongoose.Schema<Tag>({
  label: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Tag>('Tag', tagSchema);
