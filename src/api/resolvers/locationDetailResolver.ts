import { LocationDetails } from "../../types/DBtypes";
import locationsModel from "../models/locationsModel";

export default {
    Query: {
        locationDetails: async () => {
        return await locationsModel.find();
        },
        locationDetailsById: async (_parent: undefined, args: {id: string}) => {
        return await locationsModel.findById(args.id);
        },
        locationDetailsByCoordinates: async (_parent: undefined, args: {lat: number; lng: number}) => {
            return await locationsModel.findOne({lat: args.lat, lng: args.lng});
        }
    },
    Mutation: {
        createLocationDetails: async (
        _parent: undefined,
        args: {input: Omit<LocationDetails, 'id'>},
        ) => {
        return await locationsModel.create(args.input);
        },
    },
};