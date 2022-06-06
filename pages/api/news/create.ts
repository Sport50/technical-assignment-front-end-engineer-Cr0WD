import { getSession } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@prisma/connection'
import { News, User } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req })
	const response = {
		success: true,
	}
	if (!session)
		/**
		 * Check if user authenticated
		 */
		return res.status(403).json({
			...response,
			success: false,
		})

	const user = session.user as User
	const { method, body } = req

	if (method === 'POST') {
		/**
		 * Create item
		 */
		const { title, details } = body as News
		const created = await prisma.news.create({
			data: {
				title,
				details,
				User: {
					connect: {
						id: user.id,
					},
				},
			},
		})

		if (created)
			return res.status(201).json({
				...response,
				data: {
					id: created.id,
				},
			})
	}

	return res.status(400).json({
		...response,
		success: false,
	})
}
