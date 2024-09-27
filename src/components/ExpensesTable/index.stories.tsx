import type { Meta, StoryObj } from '@storybook/react'
import { ExpensesTable } from '.'

const meta = {
    title: 'Component/ExpensesTable',
    component: ExpensesTable,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text', description: 'title of component' },
    },
} satisfies Meta<typeof ExpensesTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: 'preset-storty',
        expenses: [
            {
                amount: 5000,
                category: 'estabelecimento',
                type: 'fixed',
                name: 'aluguel',
            },
        ],
    },
}
