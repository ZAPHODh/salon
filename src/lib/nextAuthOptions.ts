import { NextAuthOptions } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
export const nextAuthOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // CredentialsProvider({
        //     id: 'auth-credentials',
        //     name: 'Credentials',
        //     credentials: {
        //         email: {
        //             label: 'Email',
        //             type: 'text',
        //             placeholder: 'Digite o seu e-mail',
        //         },
        //         password: {
        //             label: 'Password',
        //             type: 'password',
        //             placeholder: 'Digite a sua senha',
        //         },
        //     },
        //     async authorize(credentials, req) {
        //         const res = await fetch('http://localhost:3001/pt/auth', {
        //             method: 'POST',
        //             body: JSON.stringify(credentials),
        //             headers: { 'Content-Type': 'application/json' },
        //         })
        //         const result = await res.json()
        //         if (res.ok) {
        //             return result.data
        //         }
        //         return null
        //     },
        // }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user
            }
            return session
        },
    },
}
