interface Expense {
    _id?: string
    name: string
    type: 'fixed' | 'variable'
    category: string
    amount: number
}
type Professional = {
    und: number
}

interface Report {
    _id: string
    salonId: string
    createdAt: Date
    reportContent: string
}

interface ReportResponse {
    message: string
    report: Report
}
interface Service {
    _id?: string
    name: string
    cost: number
    commission: number
    attachedExpenses: Expense[]
    duration: number
    whoDo: 'manicure' | 'hairdresser'
}

interface Salon {
    owner: string
    _id?: string
    name: string
    fee: number
    openDays: WeekDays[]
    hoursWorkedPerDay: number
    hoursWorkedInMonth?: number
    expenses?: Expense[]
    services?: Service[]
    professionals: {
        manicure: Professional
        hairdresser: Professional
    }
}

type WeekDays =
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
