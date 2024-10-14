'use client'

import { useEffect, useState } from 'react'
import * as Styled from './styles'
import { Button, Form, Label } from '../ExpenseForm/styles'
import { Input } from '../ExpenseForm/styles'
import { weekDays } from '@/lib/utils/weekDays'
export type SalonEditProps = {
    name: string
    openDays: string[]
    fee: number
    _id: string
    hoursWorkedPerDay: number
    owner: string
    urlApi: string
}
export const SalonEdit = ({
    owner,
    name,
    openDays,
    fee,
    _id,
    hoursWorkedPerDay,
    urlApi,
}: SalonEditProps) => {
    const [changedValues, setChangedValues] = useState<boolean>(false)
    const [defaultValues] = useState({ name, openDays, fee, hoursWorkedPerDay })
    const [formValues, setFormValues] = useState({
        owner,
        name,
        openDays,
        fee,
        hoursWorkedPerDay,
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
        if (!formValues) return
        const response = await fetch(`${urlApi}/salons/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        })
        if (!response.ok) return console.log(await response.json())
    }
    const handleCheckboxChange = (day: string) => {
        setFormValues((prev) => {
            const newOpenDays = prev.openDays.includes(day)
                ? prev.openDays.filter((d) => d !== day)
                : [...prev.openDays, day]
            return { ...prev, openDays: newOpenDays }
        })
    }
    useEffect(() => {
        const isChanged =
            defaultValues.name !== formValues.name ||
            defaultValues.fee !== formValues.fee ||
            defaultValues.hoursWorkedPerDay !== formValues.hoursWorkedPerDay ||
            JSON.stringify(defaultValues.openDays) !==
                JSON.stringify(formValues.openDays)
        setChangedValues(isChanged)
    }, [formValues, defaultValues])

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

                <Button type="submit" disabled={!changedValues}>
                    Editar
                </Button>
            </Form>
        </Styled.Wrapper>
    )
}
