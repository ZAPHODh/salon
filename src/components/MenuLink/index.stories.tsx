import type { Meta, StoryObj } from '@storybook/react'
import { MenuLink } from '.'

const meta = {
    title: 'Component/MenuLink',
    component: MenuLink,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof MenuLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { onClick: () => {}, children: 'test', href: '#' },
}
