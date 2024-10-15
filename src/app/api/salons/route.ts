import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const backendUrl = `${process.env.BACKEND_URL}/salons`

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
    const backendUrl = `${process.env.BACKEND_URL}/salons/${salonId}`

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
