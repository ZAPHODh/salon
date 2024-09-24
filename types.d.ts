interface Expense {
    name: string
    type: 'fixed' | 'variable'
    category: string
    amount: number
}

interface Service {
    name: string
    cost: number
    commission: number
    attachedExpenses: Expense[]
    duration: number
}

interface Salon {
    name: string
    fee: number
    openDays: WeekDays[]
    hoursWorkedPerDay: number
    hoursWorkedInMonth: number
    expenses: Expense[]
    services: Service[]
}

type WeekDays =
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
