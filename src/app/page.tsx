import { ExpensesTable } from '@/components/ExpensesTable'
import { ServiceProfitability } from '@/components/ServiceProfitability'

export default async function Home() {
    const data = await fetch('http:/localhost:4000/expenses', {
        cache: 'no-store',
    })
    const expenses: Expense[] = await data.json()
    let allAmount = 0
    expenses.map((expense) => (allAmount += expense.amount))
    return (
        <main>
            <ExpensesTable title="Despesas" expenses={expenses} />
            <ServiceProfitability totalCosts={allAmount} />
        </main>
    )
}
