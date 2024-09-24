'use client'

import { useState } from 'react'
import * as Styled from './styles'
import { Button, Form, Label } from '../ExpenseForm/styles'
import { Input } from '../ExpensesTable/styles'
import { weekDays } from '@/lib/utils/weekDays'
export type SalonProps = {
    name: string
    openDays: string[]
    fee: number
    _id: string
    hoursWorkedPerDay: number
}
export const Salon = ({
    name,
    openDays,
    fee,
    _id,
    hoursWorkedPerDay,
}: SalonProps) => {
    const [formValues, setFormValues] = useState({
        name,
        openDays,
        fee,
        _id,
        hoursWorkedPerDay,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form data:', formValues)
    }
    const handleCheckboxChange = (day: string) => {
        setFormValues((prev) => {
            const newOpenDays = prev.openDays.includes(day)
                ? prev.openDays.filter((d) => d !== day)
                : [...prev.openDays, day]
            return { ...prev, openDays: newOpenDays }
        })
    }
    return (
        <Styled.Wrapper>
            <Form onSubmit={handleSubmit}>
                <Label>Nome do Salão:</Label>
                <Input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                />

                <Label>Dias Abertos:</Label>
                {weekDays.map((day) => (
                    <Styled.CheckboxWrapper key={day.value}>
                        <Styled.HiddenCheckbox
                            type="checkbox"
                            checked={formValues.openDays.includes(day.value)}
                            onChange={() => handleCheckboxChange(day.value)}
                        />
                        <Styled.StyledCheckbox
                            checked={formValues.openDays.includes(day.value)}
                        />
                        {day.label}
                    </Styled.CheckboxWrapper>
                ))}

                <Label>Taxa:</Label>
                <Input
                    type="number"
                    name="fee"
                    value={formValues.fee}
                    onChange={handleInputChange}
                />

                <Label>Horas Trabalhadas por Dia:</Label>
                <Input
                    type="number"
                    name="hoursWorkedPerDay"
                    value={formValues.hoursWorkedPerDay}
                    onChange={handleInputChange}
                />

                <Button type="submit">Editar</Button>
            </Form>
        </Styled.Wrapper>
    )
}
