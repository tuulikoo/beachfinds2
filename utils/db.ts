import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: __dirname + '/../.env'});

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const mongoConnect = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URL as string);
  console.log('DB connected successfully');
  return connection;
};

export default mongoConnect;
