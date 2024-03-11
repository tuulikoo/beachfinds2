import mongoose from 'mongoose';
import { LocationDetails } from '../../types/DBtypes';

const locationDetailsSchema = new mongoose.Schema<LocationDetails>({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: false,
  },
  town: {
    type: String,
    required: false,
  },
});

export default mongoose.model<LocationDetails>('LocationDetail', locationDetailsSchema);
