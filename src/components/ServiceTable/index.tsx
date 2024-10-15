'use client'

import { useState } from 'react'

import { Add } from '@styled-icons/fluentui-system-filled/Add'
import dynamic from 'next/dynamic'
import { Edit } from '@styled-icons/evaicons-solid/Edit'
import { Trash } from '@styled-icons/evaicons-solid/Trash'
import { SortAlt } from '@styled-icons/boxicons-solid/SortAlt'
import { Save } from '@styled-icons/boxicons-solid/Save'
import { DismissSquare } from '@styled-icons/fluentui-system-filled/DismissSquare'
import {
    ActionWrapper,
    Button,
    NeutralButton,
    Table,
    TableCell,
    TableHeader,
    TableRow,
    TitleWrapper,
    Wrapper,
    WrapperHeader,
} from '../ExpensesTable/styles'
import { Input } from '../ExpenseForm/styles'

interface ServicesTableProps {
    salon: Salon
    title: string
}

const ServiceForm = dynamic(() => import('../ServiceForm'))

export const ServicesTable = ({ salon, title }: ServicesTableProps) => {
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [currentKey, setCurrentKey] = useState<keyof Service | null>(null)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [cachedServices, setCachedServices] = useState<Service[]>(
        salon.services as Service[]
    )
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editableService, setEditableService] = useState<Service | null>(null)

    const onClick = () => {
        setShowForm((prev) => !prev)
    }

    const handleCloseForm = () => {
        setShowForm(false)
    }

    const onSubmit = (service: Service) => {
        setCachedServices((prevServices) => [...prevServices, service])
    }

    const onDelete = async (service: Service) => {
        try {
            const response = await fetch(
                `/api/services?salonId=${salon._id}&serviceId=${service._id}`,
                {
                    method: 'DELETE',
                }
            )

            if (!response.ok) {
                throw new Error('Erro ao tentar deletar o serviço')
            }

            setCachedServices((prevServices) =>
                prevServices.filter((item) => item._id !== service._id)
            )
        } catch (error) {
            console.error('Erro ao deletar serviço:', error)
            alert('Erro ao deletar serviço. Tente novamente.')
        }
    }

    const sort = (key: keyof Service) => {
        setSortDirection((prevDirection) => {
            const newDirection =
                currentKey === key && prevDirection === 'asc' ? 'desc' : 'asc'
            setCurrentKey(key)
            return newDirection
        })

        setCachedServices((prevServices) =>
            [...prevServices].sort((a, b) => {
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

    const handleEdit = (service: Service, index: number) => {
        setEditingIndex(index)
        setEditableService({ ...service })
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (editableService) {
            const { name, value } = e.target
            setEditableService({ ...editableService, [name]: value })
        }
    }

    const handleSave = async () => {
        if (editableService) {
            try {
                const response = await fetch(
                    `/api/services?salonId=${salon._id}&serviceId=${editableService._id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editableService),
                    }
                )

                if (!response.ok) {
                    throw new Error('Erro ao tentar atualizar o serviço')
                }

                setCachedServices((prevServices) =>
                    prevServices.map((srv) =>
                        srv._id === editableService._id ? editableService : srv
                    )
                )
                setEditingIndex(null)
                setEditableService(null)
            } catch (error) {
                console.error('Erro ao atualizar serviço:', error)
                alert('Erro ao atualizar serviço. Tente novamente.')
            }
        }
    }

    return (
        <Wrapper>
            {showForm && (
                <ServiceForm
                    onSubmit={onSubmit}
                    onClose={handleCloseForm}
                    isOpen={showForm}
                    salon={salon}
                />
            )}
            <TitleWrapper>
                <h2>{title}</h2>
                <Button onClick={onClick}>
                    <Add />
                </Button>
            </TitleWrapper>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>
                            <WrapperHeader>
                                Serviço
                                <NeutralButton onClick={() => sort('name')}>
                                    <SortAlt />
                                </NeutralButton>
                            </WrapperHeader>
                        </TableHeader>
                        <TableHeader>
                            <WrapperHeader>
                                Preço
                                <NeutralButton onClick={() => sort('cost')}>
                                    <SortAlt />
                                </NeutralButton>
                            </WrapperHeader>
                        </TableHeader>
                        <TableHeader>
                            <WrapperHeader>
                                Comissão
                                <NeutralButton
                                    onClick={() => sort('commission')}
                                >
                                    <SortAlt />
                                </NeutralButton>
                            </WrapperHeader>
                        </TableHeader>
                        <TableHeader>
                            <WrapperHeader>
                                Duração
                                <NeutralButton onClick={() => sort('duration')}>
                                    <SortAlt />
                                </NeutralButton>
                            </WrapperHeader>
                        </TableHeader>
                        <TableHeader>Ações</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {cachedServices.map((service, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {editingIndex === index ? (
                                    <Input
                                        type="text"
                                        name="name"
                                        value={editableService?.name || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    service.name
                                )}
                            </TableCell>
                            <TableCell>
                                {editingIndex === index ? (
                                    <Input
                                        type="number"
                                        name="cost"
                                        value={editableService?.cost || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    service.cost
                                )}
                            </TableCell>
                            <TableCell>
                                {editingIndex === index ? (
                                    <Input
                                        type="number"
                                        name="commission"
                                        value={
                                            editableService?.commission || ''
                                        }
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    service.commission
                                )}
                            </TableCell>
                            <TableCell>
                                {editingIndex === index ? (
                                    <Input
                                        type="number"
                                        name="duration"
                                        value={editableService?.duration || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    service.duration
                                )}
                            </TableCell>
                            <TableCell>
                                <ActionWrapper>
                                    {editingIndex === index ? (
                                        <>
                                            <Button onClick={handleSave}>
                                                <Save />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    setEditingIndex(null)
                                                }
                                                $isDelete
                                            >
                                                <DismissSquare />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                onClick={() =>
                                                    handleEdit(service, index)
                                                }
                                            >
                                                <Edit />
                                            </Button>
                                            <Button
                                                $isDelete={true}
                                                onClick={() =>
                                                    onDelete(service)
                                                }
                                            >
                                                <Trash />
                                            </Button>
                                        </>
                                    )}
                                </ActionWrapper>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </Wrapper>
    )
}
