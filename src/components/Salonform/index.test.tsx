import { render } from '@testing-library/react'
import { SalonForm } from '.'

describe('Salonform', () => {
    it('should render the Salonform', () => {
        const { getByText } = render(
            <SalonForm owner="luispaulo.ni@gmail.com" />
        )

        const component = getByText('test')

        expect(component).toBeInTheDocument()
    })
})
