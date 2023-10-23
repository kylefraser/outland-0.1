// Input.stories.ts|tsx

import { StoryFn, Meta } from '@storybook/react';

import { Switch } from './';

export default {
  title: 'Switch',
  component: Switch,
} as Meta<typeof Switch>;

const Template: StoryFn<typeof Switch> = (args) => <Switch {...args} />;

export const Main = Template.bind({});
