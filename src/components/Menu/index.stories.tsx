import type { Meta, StoryObj } from '@storybook/react'
import { Menu } from '.'

const meta = {
    title: 'Example/Menu',
    component: Menu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Menu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        menuLink: [
            { name: 'test', to: '#' },
            { name: 'test', to: '#' },
        ],
        isLogged: false,
        logo: 'Storybook',
    },
}
