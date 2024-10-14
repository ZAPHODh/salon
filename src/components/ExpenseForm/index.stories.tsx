import type { Meta, StoryObj } from '@storybook/react'
import ExpenseForm from '.'
import { salonData } from '../Profit/mock'

const meta = {
    title: 'Component/ExpenseForm',
    component: ExpenseForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof ExpenseForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        isOpen: true,
        onSubmit: () => {},
        onClose: () => {},
        salon: salonData,
        urlApi: '',
    },
}
