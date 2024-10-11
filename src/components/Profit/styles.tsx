import styled, { keyframes } from 'styled-components'
import { Title } from '../Heading/styles'
import { NeutralButton, WrapperHeader } from '../ExpensesTable/styles'
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
export const Wrapper = styled.div`
    color: white;
    display: flex;
    width: 100vw;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
`
export const Card = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    width: 95vw;
    ${WrapperHeader} {
        height: 120px;
        margin: 0;
        ${NeutralButton} {
            margin: 0;
            height: 120px;
        }
    }
`
export const ServiceContainer = styled.div`
    width: 95vw;
    height: 120px;
    position: relative;

    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.05);
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${Title} {
        @media (max-width: 760px) {
            font-size: 16px;
        }
    }
`

export const ServiceHeader = styled.div`
    border-radius: 8px 0px 0px 8px;
    padding: 10px;
    margin-left: -16px;
    width: 100%;
    min-height: 80px;
    height: 120px;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const ServiceDetails = styled.div`
    margin: 0;
    /* height: 120px; */
    width: 100%;
    position: relative;
    padding: 16px;
    border-radius: 0px 0px 8px 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0);
    background-color: rgba(255, 255, 255, 0.1);

    display: flex;
    align-items: center;
    justify-content: center;
`

// export const PriceSlider = styled.input`
//     width: 80px;
//     margin-top: 12px;
// `

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`

export const TableHeader = styled.th`
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    text-align: left;
`

export const TableCell = styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
`
export const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    width: 100%;
    height: 120px;
`

export const Label = styled.p`
    font-size: 16px;
    font-weight: 600;
    z-index: 1;
    margin: 0;
    @media (max-width: 760px) {
        font-size: 11px;
    }
`

export const ServiceValue = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #444;
    margin: 0;
`

export const PriceSlider = styled.input`
    max-width: 60%;
    width: 120px;
    margin: 8px 0;
    padding: 5px;
    appearance: none;
    height: 6px;
    background: #97959533;
    border-radius: 4px;
    outline: none;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #8d6707;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
            background: #6f5206;
        }
    }

    &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #007bff;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
            background: #0056b3;
        }
    }
`
export const ProfitContainer = styled.div<{ $isNegative: boolean }>`
    padding: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    background-color: transparent;
    overflow: hidden;
    max-width: 400px;
    width: 100%;
    height: 120px;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 120px;
        background-image: ${({ $isNegative }) =>
            $isNegative
                ? 'linear-gradient(hsl(0, 84%, 60%), hsl(0, 79%, 71%))'
                : 'linear-gradient(hsl(120, 84%, 60%), hsl(120, 79%, 71%))'};
        filter: blur(40px);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ${rotate} 30s cubic-bezier(0.8, 0.2, 0.2, 0.8) infinite
            alternate;
    }
`
export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
