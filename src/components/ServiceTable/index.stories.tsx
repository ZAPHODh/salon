import type { Meta, StoryObj } from '@storybook/react'
import { ServicesTable } from '.'
import { salonData } from '../Profit/mock'

const meta = {
    title: 'Component/ServiceTable',
    component: ServicesTable,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof ServicesTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { salon: salonData, title: 'test' },
}
