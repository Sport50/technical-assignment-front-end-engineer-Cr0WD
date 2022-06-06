import { getSession } from 'next-auth/react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'

export interface GetServerSidePropsContextWithSession extends GetServerSidePropsContext {
	session?: Session | null
}

/**
 * Wrapper for getServerSideProps
 * * * * * * * * * *
 * export const getServerSideProps: GetServerSideProps = withSession(
 *  async ({ req, session }: GetServerSidePropsContextWithSession) => {
 * 		console.log(session)
 * 		const response = await Request('path', {
 * 			method: 'POST',
 * 		})
 *
 * 		if (response.redirect) {
 * 			return {
 * 				redirect: response.redirect,
 * 				props: {},
 * 			}
 * 		}
 *
 * 		return {
 * 			props: {
 * 				session,
 * 			},
 * 		}
 * 	}
 * )
 */
const withSession = (handler: GetServerSideProps) => async (context: GetServerSidePropsContext) => {
	const session = await getSession(context)

	return handler({
		...context,
		session,
	} as GetServerSidePropsContextWithSession)
}

export default withSession
