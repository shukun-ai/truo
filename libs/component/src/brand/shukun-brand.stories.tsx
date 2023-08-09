import type { Meta, StoryObj } from '@storybook/react';

import { ShukunBrand } from './shukun-brand';

const meta: Meta<typeof ShukunBrand> = {
  component: ShukunBrand,
};

export default meta;

type Story = StoryObj<typeof ShukunBrand>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <ShukunBrand />,
};
