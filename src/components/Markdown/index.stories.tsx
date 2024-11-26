import type { Meta, StoryObj } from '@storybook/react'
import { Markdown } from '.'

const meta = {
    title: 'Components/Markdown',
    component: Markdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Markdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        markdownText: `# Relatório de Análise Financeira

Este é um exemplo de um relatório financeiro para o salão **Beleza e Estilo**.

## Despesas

1. **Aluguel**: $1500
2. **Fornecimento de Produtos**: $300
3. **Salários**:
   - Cabeleireiros: $1200
   - Manicures: $800
4. **Marketing**: $400

## Serviços

### Cortes de Cabelo
- **Custo**: $20
- **Comissão**: 20%

### Manicure
- **Custo**: $15
- **Comissão**: 15%

## Sugestões para Reduzir Custos

- Negociar contratos com fornecedores de produtos para obter descontos.
- Investir em marketing digital para atrair mais clientes, especialmente através de **promoções online**.
- Aumentar a comissão para os profissionais com base no desempenho, incentivando melhores resultados.

---

### Observações Finais
A análise aponta que é possível reduzir custos principalmente em **fornecimento de produtos** e **marketing**. Também sugerimos considerar o aumento de preços em serviços de alta demanda.`,
    },
}
