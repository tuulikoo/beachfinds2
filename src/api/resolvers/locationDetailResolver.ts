import { LocationDetails } from '../../types/DBtypes';
import locationsModel from '../models/locationsModel';
import locationModel from '../models/locationsModel';

export const locationResolver = {
  Query: {
    allLocations: async () => {return await locationsModel.find();},
    locationById: async (_parent: undefined, { id }: { id: string }) => {
      return await locationModel.findById(id);
    },
  },

  Mutation: {
    createLocationDetail: async (
      _parent: undefined,
      args: {input: Omit<LocationDetails, 'id'>},
    ) => {
      return await locationModel.create(args.input);
    }
  }
};

