import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../utils/apollo-client';
import OCLayout from '../components/layout/OCLayout';

import '../utils/i18n';
import createEmotionCache from '../utils/createEmotionCache';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import OCThemeLight from '../styles/themes/ocThemeLight';
import Head from 'next/head';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={OCThemeLight}>
          <CssBaseline />
          <OCLayout>
            <Component {...pageProps} />
          </OCLayout>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}

export default MyApp;
