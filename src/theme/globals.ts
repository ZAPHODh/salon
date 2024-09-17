'use client'

import { createGlobalStyle } from 'styled-components'
import { css } from 'styled-components'

export const GlobalStyle = createGlobalStyle`${() => css`
    * {
        box-sizing: border-box;
        translate: no;
    }
    body {
        padding: 0px;
        margin: 0px;
        background-color: #090c08;
    }
    a {
        color: inherit;
    }
`}`
