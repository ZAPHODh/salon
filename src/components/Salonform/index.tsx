'use client'

import { useState } from 'react'
import * as Styled from './styles'
import { Button, Form, Label } from '../ExpenseForm/styles'
import { Input } from '../ExpenseForm/styles'
import { weekDays } from '@/lib/utils/weekDays'
import { Heading } from '../Heading'
import { redirect } from 'next/navigation'
export type SalonFormProps = {}
export const SalonForm = ({}: SalonFormProps) => {
    const [formValues, setFormValues] = useState<Salon>({
        fee: 0,
        hoursWorkedPerDay: 0,
        name: '',
        openDays: [],
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/salons', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(formValues),
            })
            if (!response.ok) console.log('deu erro')
        } catch (error) {
            console.log(error)
        }
    }
    const handleCheckboxChange = (day: WeekDays) => {
        setFormValues((prev) => {
            const newOpenDays = prev.openDays.includes(day)
                ? prev.openDays.filter((d) => d !== day)
                : [...prev.openDays, day]
            return { ...prev, openDays: newOpenDays }
        })
    }

    return (
        <Styled.Wrapper>
            <Heading as="h2">Primeiro, cadastre o seu salão</Heading>
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
                            onChange={() => handleCheckboxChange(day.value)}
                        />
                        <Styled.StyledCheckbox
                            checked={formValues.openDays.includes(day.value)}
                        />
                        {day.label}
                    </Styled.CheckboxWrapper>
                ))}

                <Label>Taxas de cartão:</Label>
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

                <Button type="submit">Cadastrar</Button>
            </Form>
        </Styled.Wrapper>
    )
}
