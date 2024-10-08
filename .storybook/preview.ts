import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { withReactContext } from 'storybook-react-context'
import { GlobalStyle } from '../src/theme/globals'
import { theme } from '../src/theme/theme'
import { ThemeClient } from '../src/theme/ThemeClient'
import { SalonContext } from '../src/context/salon'

export const decorators = [
    withThemeFromJSXProvider({
        GlobalStyles: GlobalStyle,
        themes: theme,
        Provider: ThemeClient,
    }),
    withReactContext({
        context: SalonContext,
        contextValue: {
            Salon: null,
            setSalon: (newSalon) => {},
        },
    }),
]
