import type { Meta, StoryObj } from '@storybook/react'
import ServiceForm from '.'
import { salonData } from '../Profit/mock'

const meta = {
    title: 'Component/ServiceForm',
    component: ServiceForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof ServiceForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        urlApi: '',
        isOpen: true,
        onClose: () => {},
        onSubmit: () => {},
        salon: salonData,
    },
}
