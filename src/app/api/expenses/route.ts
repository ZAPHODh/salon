import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const salonId = req.nextUrl.searchParams.get('salonId')
    const backendUrl = `${process.env.URL_API}/salons/${salonId}/expenses`

    const body = await req.json()

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        const data = await response.json()
        if (!response.ok) {
            return NextResponse.json(data, { status: response.status })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

export async function PUT(req: NextRequest) {
    const salonId = req.nextUrl.searchParams.get('salonId')
    const expenseId = req.nextUrl.searchParams.get('expenseId')
    const backendUrl = `${process.env.URL_API}/salons/${salonId}/expenses/${expenseId}`
    console.log(salonId, expenseId, backendUrl)
    const body = await req.json()
    try {
        const response = await fetch(backendUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        const data = await response.json()
        if (!response.ok) {
            return NextResponse.json(data, { status: response.status })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest) {
    const salonId = req.nextUrl.searchParams.get('salonId')
    const expenseId = req.nextUrl.searchParams.get('expenseId')
    const backendUrl = `${process.env.URL_API}/salons/${salonId}/expenses/${expenseId}`

    try {
        const response = await fetch(backendUrl, {
            method: 'DELETE',
        })

        if (!response.ok) {
            const data = await response.json()
            return NextResponse.json(data, { status: response.status })
        }

        return NextResponse.json({ message: 'Expense deleted successfully' })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
