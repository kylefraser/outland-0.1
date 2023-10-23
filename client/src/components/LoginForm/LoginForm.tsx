import { HTMLAttributes, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../queries';
import { Button, Input } from '..';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
  setError: any;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
}

const LoginForm = ({ setError, setToken, ...props }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      if (data) {
        const token = data.login.value;
        localStorage.setItem('outland-user-token', token);
        setToken(token);
        navigate('/user/profile', {
          replace: true,
          state: { success: 'Welcome to Outland!' },
        });
      }
    },
    update(cache, { data: { login } }) {
      cache.modify({
        fields: {
          me: () => {
            return login.value;
          },
        },
        optimistic: true,
      });
    },
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div {...props}>
      <form onSubmit={submit}>
        <Input
          name="username"
          label="Username"
          hint="Enter your username"
          placeholder="Outlander"
          value={username}
          onChange={(event: React.ChangeEvent) =>
            setUsername((event.target as HTMLInputElement).value)
          }
          style={{ marginBottom: '3rem' }}
        />
        <Input
          name="password"
          label="Password"
          hint="Enter your password"
          placeholder="m0untKatahd1n"
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent) =>
            setPassword((event.target as HTMLInputElement).value)
          }
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginTop: '6rem',
            width: '100%',
          }}
        >
          <div
            style={{ marginTop: '1rem', display: 'flex', flexDirection: 'row' }}
          >
            <Button variant="secondary" outline style={{ marginRight: '2rem' }}>
              Clear
            </Button>
            <Button outline type="submit">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
