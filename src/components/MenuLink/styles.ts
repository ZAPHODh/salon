import styled, { css } from 'styled-components'
import Link from 'next/link'
export const Wrapper = styled(Link)`
    ${() => css`
        text-decoration: none;
        color: #8b8b8b;
        padding: 10px;

        &:hover {
            color: white;
        }
        &::first-letter {
            text-transform: uppercase;
        }
    `}
`
