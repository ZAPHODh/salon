import { render } from '@testing-library/react'
import { Markdown } from '.'

describe('Markdown', () => {
    it('should render the Markdown', () => {
        const { getByText } = render(<Markdown markdownText="test" />)

        const component = getByText('test')

        expect(component).toBeInTheDocument()
    })
})
