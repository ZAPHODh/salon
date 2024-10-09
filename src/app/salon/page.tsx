import { SalonEdit } from '@/components/SalonEdit'
import { SalonForm } from '@/components/Salonform'
import { nextAuthOptions } from '@/lib/nextAuthOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
    const session = await getServerSession(nextAuthOptions)

    if (!session?.user) {
        redirect('api/auth/signin')
    }
    const response = await fetch(
        `${process.env.PUBLIC_URL_API}/salons/${session.user.email}`,
        {
            cache: 'no-store',
        }
    )

    const salon: Salon = await response.json()

    if (!salon) return <SalonForm></SalonForm>
    return (
        <SalonEdit
            _id={salon._id as string}
            fee={salon.fee}
            name={salon.name}
            hoursWorkedPerDay={salon.hoursWorkedPerDay}
            openDays={salon.openDays}
        ></SalonEdit>
    )
}
