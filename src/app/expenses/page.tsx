import { ExpensesTable } from '@/components/ExpensesTable'
import { Menu } from '@/components/Menu'
import { nextAuthOptions } from '@/lib/nextAuthOptions'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
export const metadata: Metadata = {
    title: 'Despesas do salão o salão',
    description: 'Adicionar ou editar despesas',
}
export default async function Expense() {
    const session = await getServerSession(nextAuthOptions)

    if (!session?.user) {
        redirect('api/auth/signin')
    }
    const urlApi = process.env.URL_API
    const response = await fetch(`${urlApi}/salons/${session.user.email}`)

    const salon: Salon = await response.json()
    return (
        <>
            <Menu
                isLogged={!!session}
                logo="Despesas"
                menuLink={[
                    { name: 'Despesas', to: '/expenses' },
                    { name: 'Serviços', to: '/services' },
                    { name: 'Lucratividade', to: '/' },
                    { name: 'Salão', to: '/salon' },
                ]}
            />
            <ExpensesTable title="Despesas" salon={salon} />
        </>
    )
}
