'use client'

import styled, { css } from 'styled-components'

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 600px;
    min-width: 300px;
    margin: 0 auto;
    padding: 20px;
    background-color: #090c08;
    color: white;
    border: 1px solid gray;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: relative;
`

export const Label = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
`

export const Input = styled.input`
    color: white;
    background-color: #333333;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    &:focus {
        border-color: gray;
        outline: none;
    }
    &::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
`

export const Select = styled.select`
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 16px;
    background-color: #333333;
    color: white;
    &:focus {
        border-color: gray;
        outline: none;
    }
`

export const TextArea = styled.textarea`
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 16px;
    resize: vertical;
    min-height: 100px;
    background-color: #333333;
    color: white;
    &:focus {
        border-color: #333333;
        outline: none;
    }
`

export const Button = styled.button`
    padding: 10px 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #45a049;
        cursor: pointer;
    }
`
export const Wrapper = styled.div`
    z-index: 1;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #090c08;
`
export const ProfitabilityWrapper = styled.div`
    padding: 20px;
    margin: 10px;
    width: 100%;
    max-width: 600px;
    min-width: 300px;
    height: 100px;
    background-color: #090c08;
    color: white;
    display: flex;
    align-items: start;
    justify-content: flex-start;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 10px;
`
