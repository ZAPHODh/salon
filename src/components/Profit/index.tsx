'use client'

import { useEffect, useState } from 'react'

import * as Styled from './styles'
import { Button, NeutralButton, WrapperHeader } from '../ExpensesTable/styles'
import { SortAlt } from '@styled-icons/boxicons-solid/SortAlt'
import { Save } from '@styled-icons/boxicons-solid/Save'
import { Heading } from '../HeadingTemp'

export type ProfitProps = {
    salon: Salon
}

export const Profit = ({ salon }: ProfitProps) => {
    const totalHoursInMonth =
        salon.hoursWorkedInMonth ||
        salon.hoursWorkedPerDay * salon.openDays.length * 4

    const calculateServiceMetrics = () => {
        if (!salon.services || salon.services.length === 0) return []

        return salon.services.map((service) => {
            const maxServicesPerMonth = Math.floor(
                (totalHoursInMonth * 60) / service.duration
            )
            console.log(
                maxServicesPerMonth,
                totalHoursInMonth,
                service.duration
            )
            const directExpensesTotal = service.attachedExpenses.reduce(
                (sum, expense) => sum + expense.amount,
                0
            )

            const directExpensesPerService =
                maxServicesPerMonth > 0
                    ? directExpensesTotal / maxServicesPerMonth
                    : 0

            const fixedAndVariableExpensesTotal =
                salon.expenses?.reduce((sum, expense) => {
                    if (
                        expense.type === 'fixed' ||
                        expense.type === 'variable'
                    ) {
                        return sum + expense.amount
                    }
                    return sum
                }, 0) || 0

            const indirectExpensesPerService =
                maxServicesPerMonth > 0
                    ? fixedAndVariableExpensesTotal / maxServicesPerMonth
                    : 0

            const feePerService = service.cost * (salon.fee / 100)
            const commissionPerService =
                service.cost * (service.commission / 100)

            const totalExpensesPerService =
                directExpensesPerService +
                indirectExpensesPerService +
                feePerService +
                commissionPerService

            const profit = service.cost - totalExpensesPerService

            const profitPercentage =
                service.cost > 0 ? (profit / service.cost) * 100 : 0

            return {
                ...service,
                maxServicesPerMonth,
                directExpensesPerService,
                indirectExpensesPerService,
                feePerService,
                commissionPerService,
                totalExpensesPerService,
                profit,
                profitPercentage,
                adjustedServiceCost: service.cost, // Inicializa com o custo original
            }
        })
    }

    const [serviceMetrics, setServiceMetrics] = useState(
        calculateServiceMetrics()
    )

    useEffect(() => {
        setServiceMetrics(calculateServiceMetrics())
    }, [salon])

    const handleSliderChange = (index: number, newValue: number) => {
        setServiceMetrics((prevMetrics) =>
            prevMetrics.map((metric, i) => {
                if (i === index) {
                    const maxServicesPerMonth = Math.floor(
                        (totalHoursInMonth * 60) / metric.duration
                    )
                    const directExpensesTotal = metric.attachedExpenses.reduce(
                        (sum, expense) => sum + expense.amount,
                        0
                    )

                    const directExpensesPerService =
                        maxServicesPerMonth > 0
                            ? directExpensesTotal / maxServicesPerMonth
                            : 0

                    const fixedAndVariableExpensesTotal =
                        salon.expenses?.reduce((sum, expense) => {
                            if (
                                expense.type === 'fixed' ||
                                expense.type === 'variable'
                            ) {
                                return sum + expense.amount
                            }
                            return sum
                        }, 0) || 0

                    const indirectExpensesPerService =
                        maxServicesPerMonth > 0
                            ? fixedAndVariableExpensesTotal /
                              maxServicesPerMonth
                            : 0

                    const feePerService = newValue * (salon.fee / 100)

                    const commissionPerService =
                        newValue * (metric.commission / 100)

                    const totalExpensesPerService =
                        directExpensesPerService +
                        indirectExpensesPerService +
                        feePerService +
                        commissionPerService

                    const profit = newValue - totalExpensesPerService

                    const profitPercentage =
                        newValue > 0 ? (profit / newValue) * 100 : 0

                    return {
                        ...metric,
                        adjustedServiceCost: newValue,
                        profit,
                        profitPercentage,
                        directExpensesPerService,
                        indirectExpensesPerService,
                        feePerService,
                        commissionPerService,
                        totalExpensesPerService,
                    }
                }
                return metric
            })
        )
    }

    const saveNewValue = async (service: any) => {
        try {
            const response = await fetch(
                `http://localhost:4000/salons/${salon._id}/services/${service._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...service,
                        cost: service.adjustedServiceCost,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error('Erro ao salvar o novo valor')
            }
        } catch (error) {
            console.error('Erro ao salvar o novo valor:', error)
        }
    }

    return (
        <Styled.Wrapper>
            <Heading>Dashboard de Lucro - {salon.name}</Heading>
            {serviceMetrics.map((metric, index) => {
                const [isOpen, setIsOpen] = useState(false)

                return (
                    <Styled.Card key={index}>
                        <Styled.ServiceContainer>
                            <Styled.ServiceHeader>
                                <Heading as="h3">{metric.name}</Heading>
                            </Styled.ServiceHeader>
                            <Styled.PriceContainer>
                                <Styled.Label>Valor</Styled.Label>
                                <Styled.Label>
                                    R${metric.adjustedServiceCost.toFixed(2)}
                                </Styled.Label>
                                <Styled.PriceSlider
                                    type="range"
                                    min="0"
                                    max={metric.cost * 2}
                                    value={metric.adjustedServiceCost}
                                    onChange={(e) =>
                                        handleSliderChange(
                                            index,
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                                <Styled.Label>Ajuste o valor</Styled.Label>
                            </Styled.PriceContainer>
                            <Styled.ProfitContainer
                                $isNegative={metric.profit <= 0}
                            >
                                <Styled.Label>
                                    {Math.floor(metric.profitPercentage)}%
                                </Styled.Label>
                                <Styled.Label>
                                    {metric.profit < 0
                                        ? 'Seu serviço está barato demais'
                                        : 'Lucro'}
                                </Styled.Label>
                            </Styled.ProfitContainer>
                            <Styled.ButtonContainer>
                                <Styled.Label>Salvar</Styled.Label>
                                <Button
                                    disabled={
                                        metric.cost ===
                                        metric.adjustedServiceCost
                                    }
                                    onClick={() => saveNewValue(metric)}
                                >
                                    <Save />
                                </Button>
                            </Styled.ButtonContainer>

                            <WrapperHeader>
                                <NeutralButton
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <SortAlt />
                                </NeutralButton>
                            </WrapperHeader>
                        </Styled.ServiceContainer>
                        {isOpen && (
                            <Styled.ServiceDetails>
                                <Styled.Table>
                                    <thead>
                                        <tr>
                                            <Styled.TableHeader>
                                                Descrição
                                            </Styled.TableHeader>
                                            <Styled.TableHeader>
                                                Valor (R$)
                                            </Styled.TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <Styled.TableCell>
                                                Serviços Máximos por Mês
                                            </Styled.TableCell>
                                            <Styled.TableCell>
                                                {metric.maxServicesPerMonth}
                                            </Styled.TableCell>
                                        </tr>
                                        <tr>
                                            <Styled.TableCell>
                                                Gastos Diretos por Serviço
                                            </Styled.TableCell>
                                            <Styled.TableCell>
                                                {metric.directExpensesPerService.toFixed(
                                                    2
                                                )}
                                            </Styled.TableCell>
                                        </tr>
                                        <tr>
                                            <Styled.TableCell>
                                                Gastos Indiretos por Serviço
                                            </Styled.TableCell>
                                            <Styled.TableCell>
                                                {metric.indirectExpensesPerService.toFixed(
                                                    2
                                                )}
                                            </Styled.TableCell>
                                        </tr>
                                        <tr>
                                            <Styled.TableCell>
                                                Taxa de Cartão por Serviço
                                            </Styled.TableCell>
                                            <Styled.TableCell>
                                                {metric.feePerService.toFixed(
                                                    2
                                                )}
                                            </Styled.TableCell>
                                        </tr>
                                        <tr>
                                            <Styled.TableCell>
                                                Comissão por Serviço
                                            </Styled.TableCell>
                                            <Styled.TableCell>
                                                {metric.commissionPerService.toFixed(
                                                    2
                                                )}
                                            </Styled.TableCell>
                                        </tr>
                                        <tr>
                                            <Styled.TableCell>
                                                Gastos Totais por Serviço
                                            </Styled.TableCell>
                                            <Styled.TableCell>
                                                {metric.totalExpensesPerService.toFixed(
                                                    2
                                                )}
                                            </Styled.TableCell>
                                        </tr>
                                        <tr>
                                            <Styled.TableCell>
                                                Custo Original do Serviço
                                            </Styled.TableCell>
                                            <Styled.TableCell>
                                                {metric.cost.toFixed(2)}
                                            </Styled.TableCell>
                                        </tr>
                                    </tbody>
                                </Styled.Table>
                            </Styled.ServiceDetails>
                        )}
                    </Styled.Card>
                )
            })}
        </Styled.Wrapper>
    )
}
