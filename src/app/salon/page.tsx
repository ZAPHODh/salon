import { Menu } from '@/components/Menu'
import { SalonEdit } from '@/components/SalonEdit'
import { SalonForm } from '@/components/Salonform'
import { nextAuthOptions } from '@/lib/nextAuthOptions'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
export const metadata: Metadata = {
    title: 'Configurar o salão',
    description: 'Editar informações cadastradas',
}

export default async function Home() {
    const session = await getServerSession(nextAuthOptions)

    if (!session?.user) {
        redirect('api/auth/signin')
    }

    const response = await fetch(
        `${process.env.URL_API}/salons/${session.user.email}`
    )

    const salon: Salon = await response.json()

    if (!salon)
        return <SalonForm owner={session.user.email as string}></SalonForm>
    return (
        <>
            <Menu
                isLogged={!!session}
                logo="Salão"
                menuLink={[
                    { name: 'Despesas', to: '/expenses' },
                    { name: 'Serviços', to: '/services' },
                    { name: 'Lucratividade', to: '/' },
                    { name: 'Salão', to: '/salon' },
                ]}
            />
            <SalonEdit
                owner={salon.owner}
                _id={salon._id as string}
                fee={salon.fee}
                name={salon.name}
                hoursWorkedPerDay={salon.hoursWorkedPerDay}
                openDays={salon.openDays}
            ></SalonEdit>
        </>
    )
}
