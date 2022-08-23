import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { useAuth } from '../contexts/auth';
import OCLayout from './layout/OCLayout';

type Props = {
  children: ReactElement;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isSignedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      router.push('/login');
    }
    console.log('test');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSignedIn]);

  if (isLoading && !isSignedIn) {
    return <>Loading...</>;
  }

  return router.pathname === '/login' ? (
    children
  ) : (
    <OCLayout>{children}</OCLayout>
  );
};

export default ProtectedRoute;
