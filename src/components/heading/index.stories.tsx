import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from '.'

const meta = {
    title: 'Example/Heading',
    component: Heading,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: String,
    },
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { as: 'h1', children: 'test' },
}    
