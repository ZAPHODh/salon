import type { Meta, StoryObj } from '@storybook/react'
import { Header } from '.'

const meta = {
    title: 'Component/Header',
    component: Header,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'text',
            description: 'Portuguese words',
        },
    },
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { name: 'aoba' },
}
