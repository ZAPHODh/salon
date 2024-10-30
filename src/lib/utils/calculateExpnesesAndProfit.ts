export const calculateExpensesAndProfit = (
    service: Service,
    totalHoursInMonth: number,
    salon: Salon
) => {
    const maxServicesPerMonth = Math.floor(
        (totalHoursInMonth * 60 * salon.professionals[service.whoDo].und) /
            service.duration
    )

    const directExpensesTotal = service.attachedExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    )

    const directExpensesPerService =
        maxServicesPerMonth > 0 ? directExpensesTotal / maxServicesPerMonth : 0

    const fixedAndVariableExpensesTotal =
        salon.expenses?.reduce((sum, expense) => {
            if (expense.type === 'fixed' || expense.type === 'variable') {
                return sum + expense.amount
            }
            return sum
        }, 0) || 0

    const indirectExpensesPerService =
        maxServicesPerMonth > 0
            ? fixedAndVariableExpensesTotal / maxServicesPerMonth
            : 0

    return {
        maxServicesPerMonth,
        directExpensesPerService,
        indirectExpensesPerService,
    }
}
