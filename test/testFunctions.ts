

import { TestUser } from '../src/types/DBtypes';
import { Application } from 'express';
import { LoginResponse } from '../src/types/MessageTypes';
import request from 'supertest';


const postUser = (
    url: string | Application,
    user: TestUser,
  ): Promise<TestUser> => {
    return new Promise((resolve, reject) => {
    request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .send({
          query: `mutation Mutation($user: UserInput!) {
            register(user: $user) {
              message
              user {
                id
                user_name
                email
                city
                country
                contact
              }
            }
          }`,
          variables: {
            user: {
              user_name: user.user_name,
              email: user.email,
              password: user.password,
                country: user.country,
                city: user.city,
                contact: user.contact,
            },
          },
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const userData = response.body.data.register;
            expect(userData).toHaveProperty('message');
            expect(userData).toHaveProperty('user');
            expect(userData.user).toHaveProperty('id');
            expect(userData.user.user_name).toBe(user.user_name);
            expect(userData.user.email).toBe(user.email);
            expect(userData.user.country).toBe(user.country);
            expect(userData.user.city).toBe(user.city);
            resolve(response.body.data.register);
          }
        });
    });
  };

  const loginUser = (
    url: string | Application,
    vars: {credentials: {username: string; password: string}},
  ): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .send({
          query: `mutation Login($credentials: Credentials!) {
            login(credentials: $credentials) {
              token
              message
              user {
                email
                user_name
                id
              }
            }
          }`,
          variables: vars,
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const user = vars.credentials;
            console.log('login response', response.body);
            const userData = response.body.data.login;
            expect(userData).toHaveProperty('message');
            expect(userData).toHaveProperty('token');
            expect(userData).toHaveProperty('user');
            expect(userData.user).toHaveProperty('id');
            expect(userData.user.email).toBe(user.username);
            resolve(response.body.data.login);
          }
        });
    });
  };
  export { postUser, loginUser}