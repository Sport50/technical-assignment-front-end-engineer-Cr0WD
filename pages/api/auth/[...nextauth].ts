import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import EmailProvider from 'next-auth/providers/email'
import { prisma } from '@prisma/connection'

const adapter = PrismaAdapter(prisma)

type DeleteSessionType = (sessionToken: string) => Promise<void>
const deleteSession: DeleteSessionType = sessionToken =>
	new Promise(resolve => {
		prisma.session.deleteMany({ where: { sessionToken } })
		resolve()
	})

adapter.deleteSession = deleteSession

export default NextAuth({
	adapter,
	providers: [
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
	],
	callbacks: {
		session: async ({ session, user }) => {
			session.user = user
			return session
		},
	},
	theme: {
		colorScheme: 'light',
	},
	secret: process.env.NEXT_AUTH_SECRET,
})
