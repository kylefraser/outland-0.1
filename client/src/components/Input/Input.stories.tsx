// Input.stories.ts|tsx

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Main = Template.bind({});
