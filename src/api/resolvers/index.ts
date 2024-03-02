import itemResolver from './itemResolver';
import userResolver from './userResolver';
import { noteResolver } from './noteResolver';
import { tagResolver } from './tagResolver';
export const resolvers = {
    Query: {
      ...noteResolver.Query,
      ...itemResolver.Query,
        ...userResolver.Query,
      // ...tagResolver.Query, // Uncomment if you add queries to tagResolver
    },
    Mutation: {
        ...itemResolver.Mutation,
        ...userResolver.Mutation,
      ...noteResolver.Mutation,
      ...tagResolver.Mutation,
    },
  };

