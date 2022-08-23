import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import i18n from '../utils/i18n';

interface IAuthContext {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
  isSignedIn: boolean;
  isLoading: boolean;
  createApolloClient: () => ApolloClient<unknown> | null;
}

type AuthProviderProps = {
  children: ReactElement;
};

const AuthContext = createContext<IAuthContext>({
  token: null,
  signIn: () => null,
  signOut: () => null,
  isSignedIn: false,
  isLoading: false,
  createApolloClient: () => null,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!(t === null || t === undefined)) {
      setToken(t);
    }
    setLoading(false);
  }, []);

  const createApolloClient = () => {
    // API endpoint from .env
    const GRAPHQL_URI = process.env.NEXT_PUBLIC_API_URI;

    // File upload handling, add token to header
    const uploadLink = createUploadLink({
      uri: GRAPHQL_URI,
      headers: { Authorization: `Bearer ${token}` },
    });

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
        toast.error(
          `${i18n.t('errorNetwork', { message: networkError.message })}`
        );
      }
    });

    // Apollo client
    return new ApolloClient({
      link: ApolloLink.from([errorLink, uploadLink]),
      cache: new InMemoryCache(),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        signIn,
        signOut,
        isSignedIn: Boolean(token),
        createApolloClient,
        isLoading: loading,
      }}
    >
      <ApolloProvider client={createApolloClient()}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export { useAuth, AuthProvider };
