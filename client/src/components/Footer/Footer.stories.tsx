// Footer.stories.ts|tsx

import { StoryFn, Meta } from '@storybook/react';

import { Footer } from './';

export default {
  title: 'Footer',
  component: Footer,
} as Meta<typeof Footer>;

const Template: StoryFn<typeof Footer> = (args) => <Footer {...args} />;

export const Main = Template.bind({});

Main.args = {
  size: 'md',
};
