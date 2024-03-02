import {Point} from 'geojson';
import {Document, Types} from 'mongoose';


type Item = {
  id: Types.ObjectId;
  item_name: string;
  title:string;
  category: 'Shells' | 'Seaglass' | 'Fossils' | 'Stones' | 'Driftwood' | 'Misc';
  date_found: Date;
  date_posted: Date;
  owner: Types.ObjectId | User;
  location: Point;
  filename: string;
  description: string;
  identifiers: string[];
};

type User = Partial<Document> & {
  id: Types.ObjectId | string;
  user_name: string;
  email: string;
  country: string;
  city: string;
  contact: 'yes' | 'no';
  role: 'user' | 'admin';
  password: string;
};

type UserOutput = Omit<User, 'password' | 'role'>;

type UserInput = Omit<User, '_id' | 'role'>;

type LoginUser = Omit<User, 'password'>;

type TokenContent = {
  token: string;
  user: LoginUser;
};
// *** db location query
type Location = {
  lat: number;
  lng: number;
};

type LocationInput = {
  topRight: Location;
  bottomLeft: Location;
};
// ***

export type{
  Location,
  LocationInput,
  User,
  UserOutput,
  UserInput,
  LoginUser,
  TokenContent,
  Item
};
