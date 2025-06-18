import { sendRequest } from "@/helpers/api"
import { AccountType } from "@/types/auth"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const account: AccountType = await sendRequest('/auth/login', {
                        method: 'POST',
                        body: {
                            ...credentials,
                        },
                    })

                    console.log('account', account)
                    if (!account) {
                        // throw new Error('Invalid credentials');
                        return null;
                    }

                    return {
                        id: account.id,
                        username: account.username,
                        email: account.email,
                        access_token: account.access_token,
                        refresh_token: account.refresh_token,
                        refresh_token_expiry: account.refresh_token_expiry,
                    };
                } catch (error) {
                    console.log('error', error)
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.access_token = user.access_token;
                token.refresh_token = user.refresh_token;
                token.refresh_token_expiry = user.refresh_token_expiry;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.email = token.email;
            }
            session.access_token = token.access_token;
            session.refresh_token = token.refresh_token;
            session.refresh_token_expiry = token.refresh_token_expiry;

            return session;
        },
    }
})

export { handler as GET, handler as POST }