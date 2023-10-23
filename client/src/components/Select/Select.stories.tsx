// Input.stories.ts|tsx

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from './';

export default {
  title: 'Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <Select {...args} selectProps={{ defaultValue: 'all' }}>
    <option value="all">All</option>
    <option value="one">One</option>
  </Select>
);

export const Main = Template.bind({});
