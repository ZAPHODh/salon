'use client'

import { PropsWithChildren } from 'react'
import { GlobalStyle } from '@/theme/globals'
import { SalonProvider } from '@/context/salon'

export function Providers({ children }: PropsWithChildren) {
    return (
        <>
            <SalonProvider>
                <GlobalStyle />
                {children}
            </SalonProvider>
        </>
    )
}
