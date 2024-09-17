import type { Meta, StoryObj } from '@storybook/react'
import { ServiceProfitability } from '.'

const meta = {
    title: 'Components/ServiceProfitability',
    component: ServiceProfitability,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        totalCosts: {
            control: 'number',
            description: ' description',
        },
    },
} satisfies Meta<typeof ServiceProfitability>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { totalCosts: 200 },
}
