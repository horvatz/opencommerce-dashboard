import { NextPage } from 'next';
import { useRouter } from 'next/router';
import LoginForm from '../components/login/LoginForm';
import { useAuth } from '../contexts/auth';
import {
  CreateAccessTokenInput,
  useCreateAccessTokenMutation,
} from '../generated/graphql';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [createAccessToken, { loading: createAccessTokenLoading }] =
    useCreateAccessTokenMutation();

  const { signIn } = useAuth();

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
    <>
      <LoginForm onSuccess={handleLogin} loading={createAccessTokenLoading} />
    </>
  );
};

export default LoginPage;
