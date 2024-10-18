'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Styled from './styles'
import { Button, Form, Label } from '../ExpenseForm/styles'
import { Input } from '../ExpenseForm/styles'
import { weekDays } from '@/lib/utils/weekDays'
import { Heading } from '../Heading'

export type SalonFormProps = {
    owner: string
}

export const SalonForm = ({ owner }: SalonFormProps) => {
    const [formValues, setFormValues] = useState<Salon>({
        owner,
        fee: 0,
        hoursWorkedPerDay: 0,
        name: '',
        openDays: [],
        professionals: { hairdresser: { und: 0 }, manicure: { und: 0 } },
    })
    const [hasManicure, setHasManicure] = useState(false)
    const [hasHairdresser, setHasHairdresser] = useState(false)

    const router = useRouter()

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

        try {
            const response = await fetch(`/api/salons`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(formValues),
            })
            if (!response.ok) return console.log(await response.json())
            router.push('/expenses')
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

                <Button type="submit">Cadastrar</Button>
            </Form>
        </Styled.Wrapper>
    )
}
