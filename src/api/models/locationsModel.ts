import mongoose, { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';

interface LocationDetails extends Document {
  id: Types.ObjectId;
  lat: number;
  lng: number;
  country: string;
  ocean?: string;
  weather?: string;
  nearbyAttractions?: string[];
}

const locationDetailsSchema = new Schema<LocationDetails>({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  ocean: {
    type: String,
    required: false,
  },
  weather: {
    type: String,
    required: false,
  },
  nearbyAttractions: [{
    type: String,
    required: false,
  }],
}, { timestamps: true });

export default mongoose.model<LocationDetails>('LocationDetail', locationDetailsSchema);
