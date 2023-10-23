// Button.stories.ts|tsx

import { StoryFn, Meta } from '@storybook/react';

import { Button } from './';

export default {
  title: 'Button',
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

export const Main = Template.bind({});

Main.args = {
  variant: 'primary',
};
