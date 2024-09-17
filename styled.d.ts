import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            brown: string
            lightPink: string
            darkPink: string
        }
    }
}
