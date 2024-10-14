import type { Metadata } from 'next'

import StyledComponentsRegistry from '../lib/registry'
import { ThemeClient } from '../theme/ThemeClient'
import { Providers } from './providers'

export const metadata: Metadata = {
    title: 'Profit Calculator',
    description: 'calculate your profit margin with precision',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <ThemeClient>
                <body>
                    <StyledComponentsRegistry>
                        <Providers>{children}</Providers>
                    </StyledComponentsRegistry>
                </body>
            </ThemeClient>
        </html>
    )
}
