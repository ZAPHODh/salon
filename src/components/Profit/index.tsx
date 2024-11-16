'use client'
import { useEffect, useState, useMemo } from 'react'
import * as Styled from './styles'
import { Button, NeutralButton, WrapperHeader } from '../ExpensesTable/styles'
import { SortAlt } from '@styled-icons/boxicons-solid/SortAlt'
import { Save } from '@styled-icons/boxicons-solid/Save'
import { Heading } from '../Heading'
import { calculateExpensesAndProfit } from '@/lib/utils/calculateExpnesesAndProfit'
import { Input } from '../ExpenseForm/styles'
import Link from 'next/link'

export type ProfitProps = {
    salon: Salon
}

export const Profit = ({ salon }: ProfitProps) => {
    const totalHoursInMonth =
        salon.hoursWorkedInMonth ||
        salon.hoursWorkedPerDay * salon.openDays.length * 4

    const serviceMetrics = useMemo(() => {
        if (!salon.services || salon.services.length === 0) return []

        return salon.services.map((service) => {
            const {
                maxServicesPerMonth,
                directExpensesPerService,
                indirectExpensesPerService,
            } = calculateExpensesAndProfit(service, totalHoursInMonth, salon)

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
                adjustedServiceCost: service.cost,
            }
        })
    }, [salon, totalHoursInMonth])

    const [metrics, setMetrics] = useState(serviceMetrics)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        setMetrics(serviceMetrics)
    }, [serviceMetrics])

    const [openCards, setOpenCards] = useState<boolean[]>(
        Array(metrics.length).fill(false)
    )

    const handleSliderChange = (index: number, newValue: number) => {
        setMetrics((prevMetrics) =>
            prevMetrics.map((metric, i) => {
                if (i === index) {
                    const {
                        directExpensesPerService,
                        indirectExpensesPerService,
                    } = calculateExpensesAndProfit(
                        metric,
                        totalHoursInMonth,
                        salon
                    )

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
                `/api/services?salonId=${salon._id}&serviceId=${service._id}`,
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

    const filteredMetrics = metrics.filter((metric) =>
        metric.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const toggleCardOpen = (index: number) => {
        setOpenCards((prevOpenCards) =>
            prevOpenCards.map((isOpen, i) => (i === index ? !isOpen : isOpen))
        )
    }
    const onReportClick = () => {}
    return (
        <Styled.Wrapper>
            <Styled.HeaderContainer>
                <Heading>Dashboard de Lucro - {salon.name}</Heading>
                <Input
                    type="text"
                    placeholder="Pesquise o serviço..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={onReportClick}>
                    <Link
                        style={{ textDecoration: 'none' }}
                        href={{
                            pathname: '/reports',
                        }}
                    >
                        Relatório
                    </Link>
                </Button>
            </Styled.HeaderContainer>
            {filteredMetrics.map((metric, index) => {
                const isOpen = openCards[index]

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
                                    onClick={() => toggleCardOpen(index)}
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
