import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const salonId = req.nextUrl.searchParams.get('salonId')
    const backendUrl = `${process.env.URL_API}/salons/${salonId}/reports`

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
