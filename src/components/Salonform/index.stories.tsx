import type { Meta, StoryObj } from '@storybook/react'
import { SalonForm } from '.'

const meta = {
    title: 'Components/Salonform',
    component: SalonForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof SalonForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { onSubmit: () => {} },
}
