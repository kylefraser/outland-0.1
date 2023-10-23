// Checkbox.stories.ts|tsx

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checkbox } from './';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Main = Template.bind({});
