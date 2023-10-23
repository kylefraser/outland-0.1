import React from 'react';
import { styled } from '../../../stitches.config';
import {
  Container,
  Flex,
  LoginForm,
  Section,
  Text,
  Toast,
} from '../../components';
import { Navigate, useLocation } from 'react-router-dom';
interface LoginProps {
  setError: any;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  token?: any;
}

const Login = ({ setToken, setError, token }: LoginProps) => {
  const location = useLocation();
  const { state }: any = location;

  if (token) {
    return (
      <Navigate
        replace
        to="/user/profile"
        state={{ alert: "You're already logged in." }}
      />
    );
  }

  return (
    <Container
      as={Flex}
      direction={'column'}
      align={'center'}
      justify={'center'}
    >
      <Section
        as={Flex}
        direction={'column'}
        align={'center'}
        justify={'center'}
        style={{ minHeight: '720px' }}
      >
        {state?.alert && <Toast type={'alert'}>{state?.alert}</Toast>}
        {state?.success && <Toast type={'success'}>{state?.success}</Toast>}
        <Header as="h2" size={'9'}>
          Login
        </Header>
        {/* <a href="https://groups.id.me/?client_id=1e81ad3de7fa9e89daa75aa79c5fc3d5&redirect_uri=https://www.gooutland.com/idme/callback&response_type=code&scopes=military,responder,student">
          Login in with ID.me
        </a> */}
        <Line />
        <LoginForm
          setToken={setToken}
          setError={setError}
          style={{ maxWidth: 540, width: '100%' }}
        />
      </Section>
    </Container>
  );
};

const Header = styled(Text, {
  fontWeight: 700,
  lineHeight: 1.1,
});

const Line = styled('hr', {
  borderStyle: 'solid',
  borderColor: '#9BB579',
  maxWidth: '10rem',
  marginBottom: '4rem',
  width: '100%',
});

export default Login;

// {fetch('https://api.id.me/oauth/token', {
//   body: avatarPhoto,
//   method: 'POST',
//   headers: {
//     token_type: "bearer",
//     expires_in: "300",
//     client_id: '1e81ad3de7fa9e89daa75aa79c5fc3d5&',
//     client_secret: '07d52e7ab50b4a94ce7543b8c5e1d71f',
//     redirect_uri: 'https://www.gooutland.com/idme/callback',
//     grant_type: 'authorization_code',
//   },
// })}
