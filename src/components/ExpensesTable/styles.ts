import styled, { css, keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 1px solid white;
    overflow: hidden;
    max-width: 800px;
    position: relative;
    box-sizing: border-box;

    @media (max-width: 798px) {
        max-width: 100vw;
        font-size: 9px;
        padding: 0;
        margin: 0;
    }
`

export const TableRow = styled.tr`
    background-color: #090c08;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    @media (max-width: 798px) {
        padding: 0;
        margin: 0;
    }
`

export const TableCell = styled.td`
    border-top: 1px solid gray;
    padding: 15px 3px;
    text-align: center;
    text-transform: capitalize;
    color: white;
    @media (max-width: 798px) {
        padding: 0;
        margin: 0;
        text-align: start;
    }
`

export const TableHeader = styled.th`
    background-color: #090c08;
    color: #c2c2c2;
    padding: 15px 3px;
    text-align: center;
    @media (max-width: 798px) {
        padding: 0;
        margin: 0;
    }
`

export const Button = styled.button<{ $isDelete?: boolean }>`
    ${({ theme, $isDelete }) => css`
        padding: 10px;
        background-color: ${$isDelete ? '#f44336' : theme.colors.gold};
        color: white;
        border: none;
        border-radius: 5px;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px;
        transition: all 0.5s;

        &:hover {
            background-color: ${$isDelete ? '#e53935' : theme.colors.hoverGold};
            cursor: pointer;
        }

        &:disabled {
            background-color: rgba(0, 0, 0, 0.4);
            cursor: not-allowed;
        }
        @media (max-width: 798px) {
            width: 25px;
            height: 25px;
            padding: 5px;
            margin: 5px;
        }
    `}
`

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    width: 100%;
    max-width: 800px;

    @media (max-width: 798px) {
        max-width: 90vw;
    }
`

export const Wrapper = styled.section`
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const ActionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const NeutralButton = styled.button`
    padding: 10px;
    background-color: inherit;
    color: white;
    border: none;
    border-radius: 5px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    position: relative;
    overflow: hidden;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;
    }

    &:active::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: ${pulse} 0.6s ease-out;
    }
    @media (max-width: 798px) {
        width: 25px;
        height: 25px;
        padding: 5px;
        margin: 5px;
    }
`

export const WrapperHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

export const Input = styled.input`
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid gray;
    padding: 5px;
    border-radius: 5px;

    &:focus {
        outline: none;
    }

    &::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }

    @media (max-width: 760px) {
        width: 100%;
    }
`

export const Select = styled.select`
    padding: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;

    &:focus {
        border-color: gray;
        outline: none;
    }

    @media (max-width: 760px) {
        width: 100%;
    }
`
