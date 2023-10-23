// Logo.stories.ts|tsx

import { StoryFn, Meta } from '@storybook/react';

import { Logo } from './';

export default {
  title: 'Logo',
  component: Logo,
} as Meta<typeof Logo>;

const Template: StoryFn<typeof Logo> = (args) => <Logo {...args} />;

export const Main = Template.bind({});
