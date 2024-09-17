// components/ExpensesTable/styles.ts
import styled from 'styled-components'

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
        max-width: 90vw;
    }
`

export const TableRow = styled.tr`
    background-color: #090c08;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`

export const TableCell = styled.td`
    border-top: 1px solid gray;
    padding: 15px 3px;
    text-align: left;
    text-transform: capitalize;
    color: white;
`

export const TableHeader = styled.th`
    background-color: #090c08;
    color: #c2c2c2;
    padding: 15px 3px;
    text-align: left;
`
export const Button = styled.button<{ $isDelete?: boolean }>`
    padding: 10px;
    background-color: ${({ $isDelete }) =>
        `${$isDelete ? '#f44336' : '#4caf50'}`};
    color: white;
    border: none;
    border-radius: 5px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    &:hover {
        background-color: ${({ $isDelete }) =>
            `${$isDelete ? '#e53935' : '#45a049'}`};
        cursor: pointer;
    }
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
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;
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
`
