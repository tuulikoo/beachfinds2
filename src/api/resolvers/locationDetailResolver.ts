import { LocationDetails } from "../../types/DBtypes";
import locationsModel from "../models/locationsModel";

export const locationResolver = {
  Query: {
    allLocations: async () => {
      return await locationsModel.find();
    },
    locationById: async (_parent: undefined, { id }: { id: string }) => {
      return await locationsModel.findById(id);
    },
    locationByCoordinates: async (
      _parent: undefined,
      { lat, lng }: { lat: number; lng: number }
    ) => {
      return await locationsModel.findOne({ lat, lng });
    },
  },

  Mutation: {
    createLocationDetail: async (
      _parent: undefined,
      { input }: { input: Omit<LocationDetails, "id"> }
    ) => {
      return await locationsModel.create(input);
    },
  },
};
