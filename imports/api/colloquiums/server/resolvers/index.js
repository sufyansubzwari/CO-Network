import Query from './query';
import Mutation from './mutation';
import Colloquiums from './colloquiums';

// Project namespace resolvers
const resolvers = {
  Query,
  Mutation,
  Colloquiums: Colloquiums
};

export default resolvers;
