import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { toast } from 'react-toastify';
import i18n from './utils/i18n';

// API endpoint from .env
const GRAPHQL_URI = process.env.NEXT_PUBLIC_API_URI;

// Error handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // handle graphql errors
    toast.error(
      `${i18n.t('errorGraphql', { message: graphQLErrors[0].message })}`
    );
  }

  if (networkError) {
    // handle network error
    toast.error(`${i18n.t('errorNetwork', { message: networkError.message })}`);
  }
});

// Apollo client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, new HttpLink({ uri: GRAPHQL_URI })]),
});

export default client;
