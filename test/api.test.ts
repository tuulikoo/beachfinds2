// import app from '../src/server';
// import {

//   postUser,

// } from './testFunctions';
// import mongoose from 'mongoose';
// import randomstring from 'randomstring';


// const uploadApp = process.env.UPLOAD_URL as string;
// import jwt from 'jsonwebtoken';
// import {LoginResponse, UploadResponse} from '../src/types/MessageTypes';
// import { TestUser, User } from '../src/types/DBtypes';


// describe('Testing graphql api', () => {
//   beforeAll(async () => {
//     await mongoose.connect(process.env.DATABASE_URL as string);
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });


//   // test create user
//   let userData: LoginResponse;
//   let userData2: LoginResponse;
//   let adminData: LoginResponse;

//   const testUser: TestUser = {
//     user_name: 'Test User ' + randomstring.generate(7),
//     email: randomstring.generate(9) + '@user.fi',
//     password: 'testpassword',
//     country: 'Finland',
//     city: 'Helsinki',
//     contact: 'yes',

//   };

//   const testUser2: TestUser= {
//     user_name: 'Test User ' + randomstring.generate(7),
//     email: randomstring.generate(9) + '@user.fi',
//     password: 'testpassword',
//     country: 'Finland',
//     city: 'Helsinki',
//     contact: 'yes',
//   };

//   const adminUser: TestUser = {
//     email: 'admin@metropolia.fi',
//     password: '12345',
//   };

//   // create first user
//   it('should create a new user', async () => {
//     await postUser(app, testUser);
//   });

//   // create second user to try to modify someone else's cats and userdata
//   it('should create second user', async () => {
//     await postUser(app, testUser2);
//   });

//   // test login
//   it('should login user', async () => {
//     const vars = {
//       credentials: {
//         username: testUser.email!,
//         password: testUser.password!,
//       },
//     };
//     userData = await loginUser(app, vars);
//   });

//   // test login with second user
//   it('should login second user', async () => {
//     const vars = {
//       credentials: {
//         username: testUser2.email!,
//         password: testUser2.password!,
//       },
//     };
//     userData2 = await loginUser(app, vars);
//   });

//   // test login with admin
//   it('should login admin', async () => {
//     const vars = {
//       credentials: {
//         username: adminUser.email!,
//         password: adminUser.password!,
//       },
//     };
//     adminData = await loginUser(app, vars);
//   });

//   // make sure token has role (so that we can test if user is admin or not)
//   it('token should have role', async () => {
//     const dataFromToken = jwt.verify(
//       userData.token!,
//       process.env.JWT_SECRET as string,
//     );
//     expect(dataFromToken).toHaveProperty('role');
//   });

//   // test get all users
//   it('should return array of users', async () => {
//     await getUser(app);
//   });

//   // test get single user
//   it('should return single user', async () => {
//     await getSingleUser(app, userData.user.id!);
//   });

//   // test update user
//   it('should update user', async () => {
//     await putUser(app, userData.token!);
//   });

  
//   // it should not delete user by id as normal user
//   it('should not delete a user', async () => {
//     await wrongUserDeleteCat(app, userData2.user.id, userData.token);
//   });


//   it('should delete a user as admin', async () => {
//     const result = await adminDeleteUser(
//       app,
//       userData2.user.id,
//       adminData.token,
//     );
//     console.log(
//       'user2id',
//       userData2.user.id,
//       'adminid',
//       adminData.user.id,
//       result,
//     );
//   });

//   // test delete user based on token
//   it('should delete current user', async () => {
//     await deleteUser(app, userData.token!);
//   });

