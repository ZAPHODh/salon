'use client'

import { createGlobalStyle } from 'styled-components'
import { css } from 'styled-components'
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({
    subsets: ['latin'],
    fallback: ['Georgia', 'ui-serif', 'serif'],
    weight: ['300', '700'],
})
export const GlobalStyle = createGlobalStyle`${() => css`
    * {
        box-sizing: border-box;
        translate: no;
    }
    body {
        padding: 0px;
        margin: 0px;
        font-family: ${montserrat.style.fontFamily};

        background-color: #090c08;
    }
    a {
        color: white;
    }
`}`
