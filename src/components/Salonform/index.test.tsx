import { render } from '@testing-library/react'
import { SalonForm } from '.'

describe('Salonform', () => {
    it('should render the Salonform', () => {
        const { getByText } = render(<SalonForm />)

        const component = getByText('test')

        expect(component).toBeInTheDocument()
    })
})
