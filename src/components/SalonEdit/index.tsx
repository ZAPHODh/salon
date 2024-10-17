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
    professionals?: {
        manicure?: { und: number }
        hairdresser?: { und: number }
    }
}

export const SalonEdit = ({
    owner,
    name,
    openDays,
    fee,
    _id,
    hoursWorkedPerDay,
    professionals = {},
}: SalonEditProps) => {
    const [changedValues, setChangedValues] = useState<boolean>(false)
    const [defaultValues] = useState({
        name,
        openDays,
        fee,
        hoursWorkedPerDay,
        professionals,
    })
    const [formValues, setFormValues] = useState({
        owner,
        name,
        openDays,
        fee,
        hoursWorkedPerDay,
        professionals,
    })

    const [hasManicure, setHasManicure] = useState(!!professionals.manicure)
    const [hasHairdresser, setHasHairdresser] = useState(
        !!professionals.hairdresser
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    const handleProfessionalChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: 'manicure' | 'hairdresser'
    ) => {
        const { value } = e.target
        setFormValues({
            ...formValues,
            professionals: {
                ...formValues.professionals,
                [type]: { und: Number(value) },
            },
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formValues) return
        const response = await fetch(`/api/salons?salonId=${_id}`, {
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
                JSON.stringify(formValues.openDays) ||
            JSON.stringify(defaultValues.professionals) !==
                JSON.stringify(formValues.professionals)
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

                {/* Manicure Option */}
                <Label>Tem manicure?</Label>
                <Styled.CheckboxWrapper>
                    <Styled.HiddenCheckbox
                        type="checkbox"
                        checked={hasManicure}
                        onChange={() => setHasManicure(!hasManicure)}
                    />
                    <Styled.StyledCheckbox checked={hasManicure} />
                    Sim
                </Styled.CheckboxWrapper>
                {hasManicure && (
                    <>
                        <Label>Quantidade de manicures:</Label>
                        <Input
                            type="number"
                            name="manicure"
                            value={formValues.professionals.manicure?.und || 0}
                            onChange={(e) =>
                                handleProfessionalChange(e, 'manicure')
                            }
                        />
                    </>
                )}

                {/* Hairdresser Option */}
                <Label>Tem cabeleireiro?</Label>
                <Styled.CheckboxWrapper>
                    <Styled.HiddenCheckbox
                        type="checkbox"
                        checked={hasHairdresser}
                        onChange={() => setHasHairdresser(!hasHairdresser)}
                    />
                    <Styled.StyledCheckbox checked={hasHairdresser} />
                    Sim
                </Styled.CheckboxWrapper>
                {hasHairdresser && (
                    <>
                        <Label>Quantidade de cabeleireiros:</Label>
                        <Input
                            type="number"
                            name="hairdresser"
                            value={
                                formValues.professionals.hairdresser?.und || 0
                            }
                            onChange={(e) =>
                                handleProfessionalChange(e, 'hairdresser')
                            }
                        />
                    </>
                )}

                <Button type="submit" disabled={!changedValues}>
                    Editar
                </Button>
            </Form>
        </Styled.Wrapper>
    )
}
