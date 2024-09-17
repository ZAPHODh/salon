import { render } from '@testing-library/react'
import { ServiceProfitability } from '.'

describe('ServiceProfitability', () => {
    it('should render the ServiceProfitability', () => {
        const { getByText } = render(<ServiceProfitability totalCosts={20} />)

        const component = getByText('test')

        expect(component).toBeInTheDocument()
    })
})
