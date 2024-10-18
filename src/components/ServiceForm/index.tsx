'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Label, Wrapper } from '../ExpenseForm/styles'
import {
    CheckboxWrapper,
    HiddenCheckbox,
    StyledCheckbox,
} from '../SalonForm/styles'
import { AttachedExpenses } from './styles'

interface ServiceFormProps {
    onClose: () => void
    isOpen: boolean
    onSubmit: (service: Service) => void
    salon: Salon
}

const ServiceForm: React.FC<ServiceFormProps> = ({
    onClose,
    isOpen,
    onSubmit,
    salon,
}) => {
    const [name, setName] = useState<string>('')
    const [cost, setCost] = useState<number>(0)
    const [commission, setCommission] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [attachedExpenses, setAttachedExpenses] = useState<string[]>([])
    const [whoDo, setWhoDo] = useState<'manicure' | 'hairdresser'>('manicure')

    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const service: Service = {
            name,
            cost,
            commission,
            duration,
            attachedExpenses: (salon.expenses || []).filter((expense) =>
                attachedExpenses.includes(expense._id || '')
            ),
            whoDo,
        }

        try {
            const response = await fetch(`/api/services?salonId=${salon._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(service),
            })
            const newService: Service = await response.json()
            onSubmit(newService)
        } catch (error) {
            console.log(error)
        }

        resetForm()
        onClose()
    }

    const resetForm = () => {
        setName('')
        setCost(0)
        setCommission(0)
        setDuration(0)
        setAttachedExpenses([])
        setWhoDo('manicure')
    }

    const handleExpenseChange = (expenseId: string) => {
        setAttachedExpenses((prev) =>
            prev.includes(expenseId)
                ? prev.filter((id) => id !== expenseId)
                : [...prev, expenseId]
        )
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                formRef.current &&
                !formRef.current.contains(event.target as Node)
            ) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

    return (
        <Wrapper $blur={isOpen}>
            <Form onSubmit={handleSubmit} ref={formRef}>
                <Label>Serviço</Label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <Label>Valor</Label>
                <Input
                    type="number"
                    value={cost ? cost : ''}
                    onChange={(e) => setCost(Number(e.target.value))}
                    required
                />

                <Label>Comissão</Label>
                <Input
                    type="number"
                    value={commission ? commission : ''}
                    onChange={(e) => setCommission(Number(e.target.value))}
                    required
                />

                <Label>Duração (min)</Label>
                <Input
                    type="number"
                    value={duration ? duration : ''}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    required
                />

                <Label>Despesas Atreladas</Label>
                <AttachedExpenses>
                    {salon.expenses &&
                        salon.expenses.map((expense) => (
                            <CheckboxWrapper key={expense._id}>
                                <HiddenCheckbox
                                    type="checkbox"
                                    checked={attachedExpenses.includes(
                                        expense._id || ''
                                    )}
                                    onChange={() =>
                                        handleExpenseChange(expense._id || '')
                                    }
                                />
                                <StyledCheckbox
                                    checked={attachedExpenses.includes(
                                        expense._id || ''
                                    )}
                                />
                                {expense.name}
                            </CheckboxWrapper>
                        ))}
                </AttachedExpenses>

                <Label>Quem vai fazer?</Label>
                <AttachedExpenses>
                    <CheckboxWrapper>
                        <HiddenCheckbox
                            type="radio"
                            name="whoDo"
                            value="manicure"
                            checked={whoDo === 'manicure'}
                            onChange={() => setWhoDo('manicure')}
                        />
                        <StyledCheckbox checked={whoDo === 'manicure'} />
                        Manicure
                    </CheckboxWrapper>

                    <CheckboxWrapper>
                        <HiddenCheckbox
                            type="radio"
                            name="whoDo"
                            value="hairdresser"
                            checked={whoDo === 'hairdresser'}
                            onChange={() => setWhoDo('hairdresser')}
                        />
                        <StyledCheckbox checked={whoDo === 'hairdresser'} />
                        Cabeleireiro
                    </CheckboxWrapper>
                </AttachedExpenses>

                <Button type="submit">Adicionar serviço</Button>
            </Form>
        </Wrapper>
    )
}

export default ServiceForm
