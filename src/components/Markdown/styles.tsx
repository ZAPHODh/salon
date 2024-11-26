'use client'

import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    ${({ theme }) => css`
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        color: white;
    `}
`
export const Main = styled.main`
    ${({ theme }) => css`
        max-width: 750px;
        padding: 20px;
        color: white;
    `}
`
