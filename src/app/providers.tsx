'use client'

import { PropsWithChildren } from 'react'
import { GlobalStyle } from '@/theme/globals'

export function Providers({ children }: PropsWithChildren) {
    return (
        <>
            <GlobalStyle />
            {children}
        </>
    )
}
