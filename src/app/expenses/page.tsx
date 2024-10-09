import { ExpensesTable } from '@/components/ExpensesTable'
import { nextAuthOptions } from '@/lib/nextAuthOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Expense() {
    const session = await getServerSession(nextAuthOptions)

    if (!session?.user) {
        redirect('/auth/signin')
    }
    const response = await fetch(
        `${process.env.PUBLIC_URL_API}/salons/${session.user.email}`,
        {
            cache: 'no-store',
        }
    )

    const salon: Salon = await response.json()
    return (
        <>
            <ExpensesTable title="Despesas" salon={salon} />
        </>
    )
}
