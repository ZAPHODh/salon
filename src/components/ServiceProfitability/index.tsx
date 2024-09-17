'use client'
import { useState } from 'react'
import * as Styled from './styles'
import { Heading } from '../heading'
export type ServiceProfitabilityProps = {
    totalCosts: number
}

export const ServiceProfitability = ({
    totalCosts,
}: ServiceProfitabilityProps) => {
    const [profitability, setProfitability] = useState(0)
    const [serviceValue, setServiceValue] = useState(0)
    const [equivalentCosts, setEquivalentCosts] = useState(0)
    const [commissionPercentage, setCommissionPercentage] = useState(0)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        calculateProfitability()
    }

    const calculateProfitability = () => {
        const costs = totalCosts + equivalentCosts
        const commission = (serviceValue * commissionPercentage) / 100
        const netRevenue = serviceValue - costs - commission
        setProfitability(netRevenue)
    }

    return (
        <Styled.Wrapper>
            <Styled.ProfitabilityWrapper>
                <Heading>Lucratividade</Heading>
                {profitability.toFixed(2)}
            </Styled.ProfitabilityWrapper>
            <Styled.Form onSubmit={handleSubmit}>
                <Styled.Label htmlFor="serviceValue">
                    Valor do serviço:
                </Styled.Label>
                <Styled.Input
                    type="number"
                    id="serviceValue"
                    value={serviceValue}
                    onChange={(e) => setServiceValue(Number(e.target.value))}
                />

                <Styled.Label htmlFor="equivalentCosts">
                    Custos de operação:
                </Styled.Label>
                <Styled.Input
                    type="number"
                    id="equivalentCosts"
                    value={equivalentCosts}
                    onChange={(e) => setEquivalentCosts(Number(e.target.value))}
                />

                <Styled.Label htmlFor="commissionPercentage">
                    Porcentagem de comissão:
                </Styled.Label>
                <Styled.Input
                    type="number"
                    id="commissionPercentage"
                    value={commissionPercentage}
                    onChange={(e) =>
                        setCommissionPercentage(Number(e.target.value))
                    }
                />

                <Styled.Button type="submit">Calcular</Styled.Button>
            </Styled.Form>
        </Styled.Wrapper>
    )
}
