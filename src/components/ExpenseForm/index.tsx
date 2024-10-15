'use client'

import React, { useEffect, useRef, useState } from 'react'

import { Form, Label, Input, Select, Button, Wrapper } from './styles'

interface ExpenseFormProps {
    salon: Salon
    onClose: () => void
    isOpen: boolean
    onSubmit: (expense: Expense) => void
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
    salon,
    onClose,
    isOpen,
    onSubmit,
}) => {
    const [name, setName] = useState<string>('')
    const [type, setType] = useState<'fixed' | 'variable'>('fixed')
    const [category, setCategory] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)

    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const expense: Expense = {
            category,
            amount,
            name,
            type,
        }

        try {
            const response = await fetch(`/api/expenses?salonId=${salon._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(expense),
            })
            const Expense = await response.json()
            onSubmit(Expense)
        } catch (error) {
            console.log(error)
        }

        resetForm()
        onClose()
    }

    const resetForm = () => {
        setName('')
        setType('fixed')
        setCategory('')
        setAmount(0)
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
                <Label>Despesa</Label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <Label>Tipo</Label>
                <Select
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value as 'fixed' | 'variable')
                    }
                >
                    <option value="fixed">Fixo</option>
                    <option value="variable">Variável</option>
                </Select>

                <Label>Categoria</Label>
                <Input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />

                <Label>Valor</Label>
                <Input
                    type="number"
                    value={amount ? amount : ''}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                />
                <Button type="submit">Adicionar despesa</Button>
            </Form>
        </Wrapper>
    )
}
export default ExpenseForm
