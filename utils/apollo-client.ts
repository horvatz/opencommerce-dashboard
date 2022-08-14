import { ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_URI = process.env.NEXT_PUBLIC_API_URI;

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
});

export default client;
