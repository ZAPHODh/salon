import { Markdown } from '@/components/Markdown'
import { Menu } from '@/components/Menu'
import { SalonForm } from '@/components/SalonForm'
import { nextAuthOptions } from '@/lib/nextAuthOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export type ReportsProps = {
    name: string
}

export default async function Home() {
    const session = await getServerSession(nextAuthOptions)

    if (!session?.user) {
        redirect('api/auth/signin')
    }
    const urlApi = process.env.URL_API
    const response = await fetch(`${urlApi}/salons/${session.user.email}`)

    const salon: Salon = await response.json()

    if (!salon)
        return <SalonForm owner={session.user.email as string}></SalonForm>

    const reportResponse = await fetch(
        `${urlApi}/salons/${salon._id}/reports`,
        {
            method: 'POST',
        }
    )

    const { report }: ReportResponse = await reportResponse.json()

    return (
        <>
            <Menu
                isLogged={!!session}
                logo="Relatório"
                menuLink={[
                    { name: 'Despesas', to: '/expenses' },
                    { name: 'Serviços', to: '/services' },
                    { name: 'Lucratividade', to: '/' },
                    { name: 'Salão', to: '/salon' },
                ]}
            />
            <Markdown markdownText={report.reportContent} />
        </>
    )
}
