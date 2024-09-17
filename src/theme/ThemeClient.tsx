'use client'

import { ThemeProvider } from 'styled-components'
import { theme } from './theme'

type ThemeClientProps = {
    children: React.ReactNode
}

export const ThemeClient = ({ children }: ThemeClientProps) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
