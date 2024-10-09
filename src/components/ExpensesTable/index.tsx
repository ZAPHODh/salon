'use client'

import { useState } from 'react'
import * as Styled from './styles'
import { Add } from '@styled-icons/fluentui-system-filled/Add'
import dynamic from 'next/dynamic'
import { Edit } from '@styled-icons/evaicons-solid/Edit'
import { Trash } from '@styled-icons/evaicons-solid/Trash'
import { SortAlt } from '@styled-icons/boxicons-solid/SortAlt'
import { Save } from '@styled-icons/boxicons-solid/Save'
import { DismissSquare } from '@styled-icons/fluentui-system-filled/DismissSquare'

interface ExpensesTableProps {
    salon: Salon
    title: string
}

const ExpenseForm = dynamic(() => import('../ExpenseForm'))

export const ExpensesTable = ({ salon, title }: ExpensesTableProps) => {
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [currentKey, setCurrentKey] = useState<keyof Expense | null>(null)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [cachedExpenses, setCachedExpenses] = useState<Expense[]>(
        salon.expenses || []
    )
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editableExpense, setEditableExpense] = useState<Expense | null>(null)

    const onClick = () => {
        setShowForm((prev) => !prev)
    }

    const handleCloseForm = () => {
        setShowForm(false)
    }

    const onSubmit = (expense: Expense) => {
        setCachedExpenses((prevExpenses) => [...prevExpenses, expense])
    }

    const onDelete = async (expense: Expense) => {
        try {
            const response = await fetch(
                `http://localhost:4000/expenses/${expense._id}`,
                {
                    method: 'DELETE',
                }
            )

            if (!response.ok) {
                throw new Error('Erro ao tentar deletar a despesa')
            }

            setCachedExpenses((prevExpenses) =>
                prevExpenses.filter((item) => item._id !== expense._id)
            )
        } catch (error) {
            console.error('Erro ao deletar despesa:', error)
            alert('Erro ao deletar despesa. Tente novamente.')
        }
    }

    const sort = (key: keyof Expense) => {
        setSortDirection((prevDirection) => {
            const newDirection =
                currentKey === key && prevDirection === 'asc' ? 'desc' : 'asc'
            setCurrentKey(key)
            return newDirection
        })

        setCachedExpenses((prevExpenses) =>
            [...prevExpenses].sort((a, b) => {
                const aValue = a[key]
                const bValue = b[key]

                if (aValue === undefined)
                    return sortDirection === 'asc' ? 1 : -1
                if (bValue === undefined)
                    return sortDirection === 'asc' ? -1 : 1

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortDirection === 'asc'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue)
                }

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortDirection === 'asc'
                        ? aValue - bValue
                        : bValue - aValue
                }

                return 0
            })
        )
    }

    const handleEdit = (expense: Expense, index: number) => {
        setEditingIndex(index)
        setEditableExpense({ ...expense })
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (editableExpense) {
            const { name, value } = e.target
            setEditableExpense({ ...editableExpense, [name]: value })
        }
    }

    const handleSave = async () => {
        if (editableExpense) {
            try {
                const response = await fetch(
                    `http://localhost:4000/salons/${salon._id}/services/${editableExpense._id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editableExpense),
                    }
                )

                if (!response.ok) {
                    throw new Error('Erro ao tentar atualizar a despesa')
                }

                setCachedExpenses((prevExpenses) =>
                    prevExpenses.map((exp) =>
                        exp._id === editableExpense._id ? editableExpense : exp
                    )
                )
                setEditingIndex(null)
                setEditableExpense(null)
            } catch (error) {
                console.error('Erro ao atualizar despesa:', error)
                alert('Erro ao atualizar despesa. Tente novamente.')
            }
        }
    }

    return (
        <Styled.Wrapper>
            {showForm && (
                <ExpenseForm
                    salon={salon}
                    onSubmit={onSubmit}
                    onClose={handleCloseForm}
                    isOpen={showForm}
                />
            )}
            <Styled.TitleWrapper>
                <h2>{title}</h2>
                <Styled.Button onClick={onClick}>
                    <Add />
                </Styled.Button>
            </Styled.TitleWrapper>
            <Styled.Table>
                <thead>
                    <Styled.TableRow>
                        <Styled.TableHeader>
                            <Styled.WrapperHeader>
                                Despesa
                                <Styled.NeutralButton
                                    onClick={() => sort('name')}
                                >
                                    <SortAlt />
                                </Styled.NeutralButton>
                            </Styled.WrapperHeader>
                        </Styled.TableHeader>
                        <Styled.TableHeader>
                            <Styled.WrapperHeader>
                                Categoria
                                <Styled.NeutralButton
                                    onClick={() => sort('category')}
                                >
                                    <SortAlt />
                                </Styled.NeutralButton>
                            </Styled.WrapperHeader>
                        </Styled.TableHeader>
                        <Styled.TableHeader>
                            <Styled.WrapperHeader>
                                Tipo
                                <Styled.NeutralButton
                                    onClick={() => sort('type')}
                                >
                                    <SortAlt />
                                </Styled.NeutralButton>
                            </Styled.WrapperHeader>
                        </Styled.TableHeader>
                        <Styled.TableHeader>
                            <Styled.WrapperHeader>
                                Valor
                                <Styled.NeutralButton
                                    onClick={() => sort('amount')}
                                >
                                    <SortAlt />
                                </Styled.NeutralButton>
                            </Styled.WrapperHeader>
                        </Styled.TableHeader>
                        <Styled.TableHeader>Ações</Styled.TableHeader>
                    </Styled.TableRow>
                </thead>
                <tbody>
                    {cachedExpenses.map((expense, index) => (
                        <Styled.TableRow key={index}>
                            <Styled.TableCell>
                                {editingIndex === index ? (
                                    <Styled.Input
                                        type="text"
                                        name="name"
                                        value={editableExpense?.name || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    expense.name
                                )}
                            </Styled.TableCell>
                            <Styled.TableCell>
                                {editingIndex === index ? (
                                    <Styled.Input
                                        type="text"
                                        name="category"
                                        value={editableExpense?.category || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    expense.category
                                )}
                            </Styled.TableCell>
                            <Styled.TableCell>
                                {editingIndex === index ? (
                                    <Styled.Select
                                        name="type"
                                        value={editableExpense?.type || 'fixed'}
                                        onChange={handleInputChange}
                                    >
                                        <option value="fixed">fixo</option>
                                        <option value="variable">
                                            variável
                                        </option>
                                    </Styled.Select>
                                ) : expense.type === 'fixed' ? (
                                    'fixo'
                                ) : (
                                    'variável'
                                )}
                            </Styled.TableCell>
                            <Styled.TableCell>
                                {editingIndex === index ? (
                                    <Styled.Input
                                        type="number"
                                        name="amount"
                                        value={editableExpense?.amount || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    expense.amount
                                )}
                            </Styled.TableCell>
                            <Styled.TableCell>
                                <Styled.ActionWrapper>
                                    {editingIndex === index ? (
                                        <>
                                            <Styled.Button onClick={handleSave}>
                                                <Save />
                                            </Styled.Button>
                                            <Styled.Button
                                                onClick={() =>
                                                    setEditingIndex(null)
                                                }
                                                $isDelete
                                            >
                                                <DismissSquare />
                                            </Styled.Button>
                                        </>
                                    ) : (
                                        <>
                                            <Styled.Button
                                                onClick={() =>
                                                    handleEdit(expense, index)
                                                }
                                            >
                                                <Edit />
                                            </Styled.Button>
                                            <Styled.Button
                                                $isDelete={true}
                                                onClick={() =>
                                                    onDelete(expense)
                                                }
                                            >
                                                <Trash />
                                            </Styled.Button>
                                        </>
                                    )}
                                </Styled.ActionWrapper>
                            </Styled.TableCell>
                        </Styled.TableRow>
                    ))}
                </tbody>
            </Styled.Table>
        </Styled.Wrapper>
    )
}
