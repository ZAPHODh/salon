import { render } from '@testing-library/react'
import { Profit } from '.'
import { salonData } from './mock'

describe('Profit', () => {
    it('should render the Profit', () => {
        const { getByText } = render(<Profit salon={salonData} />)

        const component = getByText('test')

        expect(component).toBeInTheDocument()
    })
})
