import { Point } from "geojson";
import { LoginUser, UserOutput } from "./DBtypes";
type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

type UserResponse = MessageResponse & {
  user: UserOutput;
};

type LoginResponse = MessageResponse & {
  token: string;
  user: LoginUser;
};

type UploadResponse = MessageResponse & {
  data: {
    filename: string;
    location: Point;
  };
};

export type {
  MessageResponse,
  ErrorResponse,
  UserResponse,
  LoginResponse,
  UploadResponse,
};
