import { styled } from '../../../stitches.config';
import { Container, Flex, RegisterForm, Section, Text } from '../../components';
import { Navigate } from 'react-router-dom';

interface RegisterProps {
  notify: any;
  token?: any;
}

const Register = ({ notify, token }: RegisterProps) => {
  if (token) {
    return (
      <Navigate
        replace
        to="/user/profile"
        state={{ alert: "You're already logged in with an account." }}
      />
    );
  }

  return (
    <>
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
          <Header as="h2" size={'9'}>
            Register
          </Header>
          <Line />
          <RegisterForm
            notify={notify}
            style={{ maxWidth: 540, width: '100%' }}
          />
        </Section>
      </Container>
    </>
  );
};

const Header = styled(Text, {
  fontWeight: 700,
  lineHeight: 1.1,
});

const Line = styled('hr', {
  borderStyle: 'solid',
  borderColor: '#9BB579',
  maxWidth: '14rem',
  marginBottom: '4rem',
  width: '100%',
});

export default Register;
