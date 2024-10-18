import styled, { css } from 'styled-components'

export const Wrapper = styled.a`
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
