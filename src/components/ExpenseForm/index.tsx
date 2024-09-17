'use client'

import React, { useEffect, useRef, useState } from 'react'

import { Form, Label, Input, Select, Button, TextArea, Wrapper } from './styles'

interface ExpenseFormProps {
    onClose: () => void
    isOpen: boolean
    onSubmit: (expense: Expense) => void
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
    onClose,
    isOpen,
    onSubmit,
}) => {
    const [date, setDate] = useState<string>('')
    const [type, setType] = useState<'fixed' | 'variable'>('fixed')
    const [category, setCategory] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)
    const [notes, setNotes] = useState<string>('')

    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const expense = {
            date: new Date(date),
            type,
            category,
            amount,
            notes,
        }

        try {
            await fetch('http://localhost:4000/expenses', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(expense),
            })
            onSubmit(expense)
        } catch (error) {
            console.log(error)
        }

        resetForm()
        onClose()
    }

    const resetForm = () => {
        setDate('')
        setType('fixed')
        setCategory('')
        setAmount(0)
        setNotes('')
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
                <Label>Data</Label>
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                />

                <Label>Notas</Label>
                <TextArea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                <Button type="submit">Adicionar despesa</Button>
            </Form>
        </Wrapper>
    )
}
export default ExpenseForm
