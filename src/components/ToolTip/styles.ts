'use client'

import styled, { css } from 'styled-components'
import { getPosition } from './utils/getPosition'

export const Wrapper = styled.div`
    ${({ theme }) => css`
        position: relative;
    `}
`
export const StyledTooltip = styled.div<{
    $position: 'top' | 'right' | 'bottom' | 'left'
}>`
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 8px;
    border-radius: 4px;
    position: absolute;
    z-index: 1;
    transition: opacity 0.2s ease-in-out;

    ${({ $position }) => getPosition($position)}
`
