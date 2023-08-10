import type { Meta, StoryObj } from '@storybook/react';

import { ShukunBrand } from './shukun-brand';

const meta: Meta<typeof ShukunBrand> = {
  component: ShukunBrand,
};

export default meta;

type Story = StoryObj<typeof ShukunBrand>;

export const Primary: Story = {
  render: () => <ShukunBrand />,
};
