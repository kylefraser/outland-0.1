// LoginForm.stories.ts|tsx

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LoginForm } from './';

export default {
  title: 'LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
);

export const Main = Template.bind({});
