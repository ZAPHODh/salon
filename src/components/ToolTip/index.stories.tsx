import type { Meta, StoryObj } from '@storybook/react'
import { ToolTip } from '.'

const meta = {
    title: 'Component/ToolTip',
    component: ToolTip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text', description: 'Tooltip text' },
        position: { control: 'select', description: 'tooltip position' },
    },
} satisfies Meta<typeof ToolTip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        text: 'story',
        children: <>storybook tooltip showcase</>,
        position: 'top',
    },
}
