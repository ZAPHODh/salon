import { render, screen, fireEvent } from '@testing-library/react'
import { SalonEdit, SalonEditProps } from '.'
import { weekDays } from '@/lib/utils/weekDays'

const mockProps: SalonEditProps = {
    name: 'Salão Teste',
    openDays: ['monday', 'wednesday'],
    fee: 100,
    _id: '1',
    hoursWorkedPerDay: 8,
}

describe('SalonEdit Component', () => {
    it('should render the form with initial values', () => {
        render(<SalonEdit {...mockProps} />)

        expect(screen.getByLabelText(/Nome do Salão:/i)).toHaveValue(
            mockProps.name
        )
        expect(screen.getByLabelText(/Taxa:/i)).toHaveValue(mockProps.fee)
        expect(
            screen.getByLabelText(/Horas Trabalhadas por Dia:/i)
        ).toHaveValue(mockProps.hoursWorkedPerDay)

        weekDays.forEach((day) => {
            const checkbox = screen.getByLabelText(day.label)
            if (mockProps.openDays.includes(day.value)) {
                expect(checkbox).toBeChecked()
            } else {
                expect(checkbox).not.toBeChecked()
            }
        })

        expect(screen.getByRole('button', { name: /editar/i })).toBeDisabled()
    })

    it('should enable the submit button when values change', () => {
        render(<SalonEdit {...mockProps} />)

        fireEvent.change(screen.getByLabelText(/Nome do Salão:/i), {
            target: { value: 'Novo Salão' },
        })

        expect(screen.getByRole('button', { name: /editar/i })).toBeEnabled()
    })

    it('should update form values and call onSubmit when submitted', () => {
        render(<SalonEdit {...mockProps} />)

        fireEvent.change(screen.getByLabelText(/Nome do Salão:/i), {
            target: { value: 'Novo Salão' },
        })
        fireEvent.change(screen.getByLabelText(/Taxa:/i), {
            target: { value: '150' },
        })

        fireEvent.submit(screen.getByRole('button', { name: /editar/i }))

        expect(console.log).toHaveBeenCalledWith(
            'Form data:',
            expect.objectContaining({
                name: 'Novo Salão',
                fee: 150,
                hoursWorkedPerDay: mockProps.hoursWorkedPerDay,
                openDays: mockProps.openDays,
                _id: mockProps._id,
            })
        )
    })

    it('should toggle the checkbox value when clicked', () => {
        render(<SalonEdit {...mockProps} />)

        const mondayCheckbox = screen.getByLabelText(/monday/i)
        expect(mondayCheckbox).toBeChecked()

        fireEvent.click(mondayCheckbox)
        expect(mondayCheckbox).not.toBeChecked()

        fireEvent.click(mondayCheckbox)
        expect(mondayCheckbox).toBeChecked()
    })
})
