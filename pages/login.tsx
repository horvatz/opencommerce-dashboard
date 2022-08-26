import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiShoppingCart } from 'react-icons/fi';
import LoginForm from '../components/login/LoginForm';
import { useAuth } from '../contexts/auth';
import {
  CreateAccessTokenInput,
  useCreateAccessTokenMutation,
} from '../generated/graphql';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [createAccessToken, { loading: createAccessTokenLoading }] =
    useCreateAccessTokenMutation();

  const { isSignedIn, signIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, router]);

  const handleLogin = async (data: CreateAccessTokenInput) => {
    try {
      const { data: accessTokenData } = await createAccessToken({
        variables: { user: data },
      });

      const accessToken = accessTokenData?.createAccessToken.accessToken;

      if (accessToken) {
        signIn(accessToken);
        router.push('/');
      }
    } catch (error) {}
  };

  return (
    <div className="h-screen w-screen container mx-auto flex flex-col items-center justify-center">
      <div className="w-full md:w-5/12">
        <span className="flex justify-center items-center text-3xl gap-2 w-full h-40 text-center rounded-lg">
          <FiShoppingCart />
          <span className="font-medium text-gray-900">{t('appName')}</span>
        </span>
        <LoginForm onSuccess={handleLogin} loading={createAccessTokenLoading} />
      </div>
    </div>
  );
};

export default LoginPage;
