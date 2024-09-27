'use client'

import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        &{Input}{
            
        }
    `}
`
export const CheckboxWrapper = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
`

export const HiddenCheckbox = styled.input`
    display: none; /* Oculta o checkbox nativo */
`

export const StyledCheckbox = styled.div<{ checked: boolean }>`
    ${({ theme, checked }) => css`
        width: 20px;
        height: 20px;
        border-radius: 4px;
        background-color: ${checked ? theme.colors.gold : theme.colors.gray};
        position: relative;
        margin-right: 8px;

        &:after {
            content: '';
            position: absolute;
            left: 6px;
            top: 2px;
            width: 4px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            opacity: ${checked ? '1' : '0'};
        }
    `}
`
