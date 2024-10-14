import { render } from '@testing-library/react'
import ServiceForm from '.'

describe('ServiceForm', () => {
    it('should render the ServiceForm', () => {
        const { getByText } = render(<ServiceForm urlApi="" />)

        const component = getByText('test')

        expect(component).toBeInTheDocument()
    })
})
