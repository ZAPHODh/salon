'use client'

import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    ${({ theme }) => css``}
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
    ${({ theme }) => css``}
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: ${({ checked }) => (checked ? '#4caf50' : 'white')};
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
        opacity: ${({ checked }) => (checked ? '1' : '0')};
    }
`
