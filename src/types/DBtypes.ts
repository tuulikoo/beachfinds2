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


type Post = Partial<Document> & {
  id?: Types.ObjectId | string;
  item_name: string;
  title: string;
  category: 'Shells' | 'Seaglass' | 'Fossils' | 'Stones' | 'Driftwood' | 'Misc';
  owner: Types.ObjectId | User;
  location: Point;
  filename: string;
  createDate: Date;
  description: string;
  tags: Types.ObjectId[];
};

type Cat = Partial<Document> & {
  id?: Types.ObjectId | string;
  cat_name: string;
  weight: number;
  owner: Types.ObjectId | User;
  filename: string;
  birthdate: Date;
  location: Point;
};

type Note = {
    id: Types.ObjectId | string;
    title: string;
    markdown: string;
    tags: Types.ObjectId[];
    createdAt: Date;
    owner: Types.ObjectId | User;
  }

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

type NoteInput = Omit<Note, '_id' | 'createdAt'>;

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
  Item,
  Note,
  Tag,
  UserModified,
  Post,
  NoteInput,
  Cat
};
