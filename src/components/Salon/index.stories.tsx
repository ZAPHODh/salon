import type { Meta, StoryObj } from '@storybook/react'
import { Salon } from '.'

const meta = {
    title: 'Components/Salon',
    component: Salon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'text',
            description: ' description',
        },
    },
} satisfies Meta<typeof Salon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        _id: 'test',
        fee: 25,
        hoursWorkedPerDay: 8,
        name: 'Mauro Chrisostimo',
        openDays: ['sunday', 'monday'],
    },
}
