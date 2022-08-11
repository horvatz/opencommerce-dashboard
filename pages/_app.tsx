import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import OCLayout from '../components/layout/OCLayout';

import '../utils/i18n';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <OCLayout>
        <Component {...pageProps} />
      </OCLayout>
    </ApolloProvider>
  );
}

export default MyApp;
