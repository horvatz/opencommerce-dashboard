import { ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_URI = process.env.API_URI;

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
});

export default client;
