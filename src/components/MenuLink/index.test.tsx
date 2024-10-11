import { fireEvent, render } from '@testing-library/react'
import { MenuLink } from '.'

describe('MenuLink Component', () => {
    const mockProps = {
        children: 'Link Text',
        href: '/example-link',
        onClick: jest.fn(),
        target: '_blank' as '_blank' | '_self',
    }
    it('should render link text and href attribute', () => {
        const { getByText } = render(<MenuLink {...mockProps} />)
        const link = getByText(mockProps.children)
        expect(link).toHaveAttribute('href', mockProps.href)
    })

    it('should call onClick function when link is clicked', () => {
        const { getByText } = render(<MenuLink {...mockProps} />)
        const link = getByText(mockProps.children)
        fireEvent.click(link)
        expect(mockProps.onClick).toHaveBeenCalledTimes(1)
    })

    it('should have target attribute set to _self by default', () => {
        const { getByText } = render(
            <MenuLink {...mockProps} target={undefined} />
        )
        const link = getByText(mockProps.children)
        expect(link).toHaveAttribute('target', '_self')
    })

    it('should have target attribute set to _blank when passed as prop', () => {
        const { getByText } = render(<MenuLink {...mockProps} />)
        const link = getByText(mockProps.children)
        expect(link).toHaveAttribute('target', '_blank')
    })
})
