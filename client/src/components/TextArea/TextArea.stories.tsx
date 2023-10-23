// TextArea.stories.ts|tsx

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextArea } from './';

export default {
  title: 'TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Main = Template.bind({});
