import { SalonForm } from '@/components/SalonForm'
import { nextAuthOptions } from '@/lib/nextAuthOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export type ReportsProps = {
    name: string
}

export default async function Reports() {
    const session = await getServerSession(nextAuthOptions)

    if (!session?.user) {
        redirect('api/auth/signin')
    }
    const urlApi = process.env.URL_API
    const response = await fetch(`${urlApi}/salons/${session.user.email}`)

    const salon: Salon = await response.json()

    if (!salon)
        return <SalonForm owner={session.user.email as string}></SalonForm>
    const report: ReportResponse = await fetch(
        `${urlApi}/salons/${salon._id}/reports`
    ).then((res) => res.json())

    return <div>{report.report.reportContent}</div>
}
