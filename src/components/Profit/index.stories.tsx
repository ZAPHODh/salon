import type { Meta, StoryObj } from '@storybook/react'
import { Profit } from '.'
import { salonData } from './mock'

const meta = {
    title: 'Component/Profit',
    component: Profit,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Profit>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { salon: salonData },
}
