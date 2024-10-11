import { withThemeFromJSXProvider } from '@storybook/addon-themes'

import { GlobalStyle } from '../src/theme/globals'
import { theme } from '../src/theme/theme'
import { ThemeClient } from '../src/theme/ThemeClient'

export const decorators = [
    withThemeFromJSXProvider({
        GlobalStyles: GlobalStyle,
        themes: theme,
        Provider: ThemeClient,
    }),
]
