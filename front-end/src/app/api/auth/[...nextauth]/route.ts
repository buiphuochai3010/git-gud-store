import { sendRequest } from "@/lib/api"
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
                    const res = await sendRequest<AccountType>('/auth/login', {
                        method: 'POST',
                        body: {
                            ...credentials,
                        },
                    })

                    if (!res?.success) {
                        throw new Error(res?.message || 'Có lỗi xảy ra khi đăng nhập, vui lòng thử lại sau')
                    }

                    return {
                        id: res.data?.id,
                        username: res.data?.username,
                        email: res.data?.email,
                        access_token: res.data?.access_token,
                        refresh_token: res.data?.refresh_token,
                        refresh_token_expiry: res.data?.refresh_token_expiry,
                    };
                } catch (error) {
                    throw error;
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
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
    },
    events: {
        async signIn(message) {
            console.log('signIn event', message)
        },
        async signOut(message) {
            console.log('signOut event', message)
        },
    }
})

export { handler as GET, handler as POST }