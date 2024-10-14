import { render } from '@testing-library/react'
import { SalonForm } from '.'

describe('Salonform', () => {
    it('should render the Salonform', () => {
        const { getByText } = render(
            <SalonForm owner="luispaulo.ni@gmail.com" urlApi="" />
        )

        const component = getByText('test')

        expect(component).toBeInTheDocument()
    })
})
