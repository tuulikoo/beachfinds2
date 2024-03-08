import 'dotenv/config';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from 'mongoose';
import typeDefs from './api/schemas/index';
import resolvers from './api/resolvers/index';
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { notFound, errorHandler } from './middlewares';
import authenticate from './functions/authenticate';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { MyContext } from './types/MyContext';
import { MessageResponse } from './types/MessageTypes';


const app = express();

app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
    }),
);

app.use(express.static('public'));

console.log('DATABASE_URL:', process.env.DATABASE_URL);

// MongoDB connection
const mongoConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL as string);
        console.log('DB connected successfully');
        return connection;
    } catch (error) {
        console.error('DB connection error:', error);
    }
};

app.get('/', (_req: Request, res: Response<MessageResponse>) => {
    res.send({ message: 'Server is running' });
});

const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs,
        resolvers,
    }),
);

const server = new ApolloServer<MyContext>({
    schema,
    introspection: true,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
            embed: true as false,
          })
        : ApolloServerPluginLandingPageLocalDefault(),
    ],
    includeStacktraceInErrorResponses: false,
  });

(async () => {
    try {
        await server.start();
        app.use(
            '/graphql',
            cors(),
            express.json(),
            expressMiddleware(server, {
                context: async ({ req }) => authenticate(req),
            }),
        );

        app.use(notFound);
        app.use(errorHandler);

        await mongoConnect();
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Listening: http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Server error', error);
    }
})();