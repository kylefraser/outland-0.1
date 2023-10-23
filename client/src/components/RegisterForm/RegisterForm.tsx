import { HTMLAttributes, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../queries';
import { Button, Flex, Input } from '..';

interface RegisterFormProps extends HTMLAttributes<HTMLDivElement> {
  notify?: any;
}

const RegisterForm = ({ notify, ...props }: RegisterFormProps) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: () => {
      notify('Success.');
    },
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    createUser({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <div {...props}>
      <form onSubmit={submit}>
        <Input
          name="email"
          label="Email"
          placeholder="outlander@gooutland.com"
          value={email}
          onChange={(event: React.ChangeEvent) =>
            setEmail((event.target as HTMLInputElement).value)
          }
          hint="Enter a valid email address."
          style={{ marginBottom: '3rem' }}
        />
        <Input
          name="password"
          label="Password"
          placeholder="m0untKatahd1n"
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent) =>
            setPassword((event.target as HTMLInputElement).value)
          }
          hint="Enter a password. Minimum 8 characters."
          style={{ marginBottom: '3rem' }}
        />
        <Input
          name="confirm_password"
          label="Confirm Password"
          placeholder="m0untKatahd1n"
          type="password"
          value={confirmPassword}
          onChange={(event: React.ChangeEvent) =>
            setConfirmPassword((event.target as HTMLInputElement).value)
          }
          hint="Make sure your passwords match."
        />
        <Flex
          justify={'end'}
          style={{
            marginTop: '6rem',
            width: '100%',
          }}
        >
          <Button variant="secondary" outline style={{ marginRight: '2rem' }}>
            Clear
          </Button>
          <Button type="submit" outline>
            Register
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default RegisterForm;
