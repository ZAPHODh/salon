interface Expense {
    _id?: string
    date: Date
    type: 'fixed' | 'variable'
    category: string
    amount: number
    notes?: string
}

interface Service {
    name: string
    coust: number
    amount: number
    commission: number
}
