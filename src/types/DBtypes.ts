import {Point} from 'geojson';
import {Document, Types} from 'mongoose';



type Post = Partial<Document> & {
  id?: Types.ObjectId | string;
  item_name: string;
  title: string;
  category: 'Shells' | 'Seaglass' | 'Fossils' | 'Stones' | 'Driftwood' | 'Misc';
  owner: Types.ObjectId | User;
  location: Point;
  filename: string;
  description: string;
  tags: Types.ObjectId[];
};

  type Tag = {
    id: Types.ObjectId | string;
    label: string;
  }

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

type UserInput = Omit<User, 'id' | 'role'>;

type LoginUser = Omit<User, 'password'>;

type UserModified = Omit<User, 'role' | 'id'>;




type TokenContent = {
  token: string;
  user: LoginUser;
};
type Location = {
  lat: number;
  lng: number;
};

type LocationInput = {
  topRight: Location;
  bottomLeft: Location;
};



export type{
  Location,
  LocationInput,
  User,
  UserOutput,
  UserInput,
  LoginUser,
  TokenContent,
  Tag,
  UserModified,
  Post,
};
