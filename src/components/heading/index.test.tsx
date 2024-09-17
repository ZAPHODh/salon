import { render } from '@testing-library/react'
import { Heading } from '.'


describe('Heading', () => {
    it('should renders a heading', () => {
        const { getByRole } = render(<Heading>test</Heading>)

        const heading = getByRole('heading')

        expect(heading).toBeInTheDocument()
    })

    it('should renders heading with the correct "as" propperty', () => {
        const { getByRole } = render(<Heading as="h2">test</Heading>)

        const heading = getByRole('heading')

        expect(heading.tagName).toBe('H2')
    })
    it('should renders heading with the correct children text', () => {
        const { getByRole } = render(<Heading>children text</Heading>)

        const heading = getByRole('heading')

        expect(heading).toHaveTextContent('children text')
    })

    it('should match snapshot', () => {
        const { getByRole } = render(<Heading>test</Heading>)

        const heading = getByRole('heading')

        expect(heading).toMatchSnapshot()
    })
})