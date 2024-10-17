'use client'

import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    ${({ theme }) => css``}
`
export const AttachedExpenses = styled.div`
    ${({ theme }) => css`
        display: flex;
        align-items: flex-start;
        gap: 10px;
        justify-content: flex-start;
        flex-direction: column;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 12px;
        }

        &::-webkit-scrollbar-track {
            background: ${theme.colors.gray};
            border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${theme.colors.gold};
            border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background-color: ${theme.colors.hoverGold};
        }
    `}
`
