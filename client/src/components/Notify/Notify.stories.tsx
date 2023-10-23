// Notify.stories.ts|tsx

import { StoryFn, Meta } from '@storybook/react';

import { Notify } from './';

export default {
  title: 'Notify',
  component: Notify,
} as Meta<typeof Notify>;

const Template: StoryFn<typeof Notify> = (args) => <Notify {...args} />;

export const Main = Template.bind({});
