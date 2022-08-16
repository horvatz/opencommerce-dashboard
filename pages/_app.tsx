import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import OCLayout from '../components/layout/OCLayout';
import 'react-toastify/dist/ReactToastify.css';

import '../utils/i18n';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <OCLayout>
          <Component {...pageProps} />
          <ToastContainer />
        </OCLayout>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default MyApp;
