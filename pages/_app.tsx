import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';

import '../utils/i18n';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import { AuthProvider } from '../contexts/auth';
import ProtectedRoute from '../components/ProtectedRoute';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RecoilRoot>
        <ProtectedRoute>
          <>
            <Component {...pageProps} />
            <ToastContainer />
          </>
        </ProtectedRoute>
      </RecoilRoot>
    </AuthProvider>
  );
}

export default MyApp;
