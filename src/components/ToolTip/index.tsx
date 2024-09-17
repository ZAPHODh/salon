'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import * as Styled from './styles'

export type ToolTipProps = {
    position: 'top' | 'right' | 'bottom' | 'left'
    text: string
    children: React.ReactNode
}
const StyledTooltip = dynamic(() =>
    import('./styles').then((styles) => styles.StyledTooltip)
)
export const ToolTip = ({ position, text, children }: ToolTipProps) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <Styled.Wrapper
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <StyledTooltip $position={position}>{text}</StyledTooltip>
            )}
        </Styled.Wrapper>
    )
}
