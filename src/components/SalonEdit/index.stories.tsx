import type { Meta, StoryObj } from '@storybook/react'
import { SalonEdit } from '.'

const meta = {
    title: 'Component/SalonEdit',
    component: SalonEdit,
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
} satisfies Meta<typeof SalonEdit>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        _id: 'test',
        fee: 25,
        hoursWorkedPerDay: 8,
        name: 'Mauro Chrisostimo',
        openDays: ['sunday', 'monday'],
        owner: 'luis',
    },
}
