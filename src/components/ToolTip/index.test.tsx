import { fireEvent, render } from '@testing-library/react'
import { ToolTip } from '.'
import { ThemeClient } from '../../theme/ThemeClient'

describe('ToolTip', () => {
    it('should render the ToolTip', async () => {
        const { findByText } = render(
            <ThemeClient>
                <ToolTip text="test" position="left">
                    <span>test</span>
                </ToolTip>
            </ThemeClient>
        )

        const component = await findByText('test')
        expect(component).toBeInTheDocument()
    })

    it('should render the ToolTip when the mouse enters', async () => {
        const { findByText, getByText } = render(
            <ThemeClient>
                <ToolTip text="tooltip" position="left">
                    <span>test</span>
                </ToolTip>
            </ThemeClient>
        )

        const triggerElement = getByText('test')
        fireEvent.mouseEnter(triggerElement)

        const tooltip = await findByText('tooltip')
        expect(tooltip).toBeInTheDocument()
    })

    it('should unrender the ToolTip when the mouse leaves', async () => {
        const { getByText, queryByText } = render(
            <ThemeClient>
                <ToolTip text="tooltip" position="left">
                    <span>test</span>
                </ToolTip>
            </ThemeClient>
        )

        const triggerElement = getByText('test')

        fireEvent.mouseLeave(triggerElement)
        expect(queryByText('tooltip')).not.toBeInTheDocument()
    })
})
