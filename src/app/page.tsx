import { Menu } from '@/components/Menu'
import { Profit } from '@/components/Profit'
import { nextAuthOptions } from '@/lib/nextAuthOptions'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
    const session = await getServerSession(nextAuthOptions)
    if (!session?.user) {
        redirect('/api/auth/signin')
    }
    const urlApi = process.env.URL_API
    const response = await fetch(`${urlApi}/salons/${session.user.email}`, {
        cache: 'no-store',
    })

    const salon: Salon = await response.json()

    if (!salon) redirect('/salon')

    return (
        <>
            <Menu
                isLogged={!!session}
                logo="Lucratividade"
                menuLink={[
                    { name: 'Despesas', to: '/expenses' },
                    { name: 'Serviços', to: '/services' },
                    { name: 'Lucratividade', to: '/' },
                    { name: 'Salão', to: '/salon' },
                ]}
            />
            <Profit salon={salon}></Profit>
        </>
    )
}
