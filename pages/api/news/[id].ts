import { getSession } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from 'next'
import { News, User } from '@prisma/client'
import { prisma } from '@prisma/connection'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const response = {
		success: true,
	}

	const { method, query, body } = req

	if (!query.id)
		/**
		 * Check if no id provided
		 */
		return res.status(400).json({
			...response,
			success: false,
		})

	if (method === 'GET') {
		/**
		 * Get one item
		 */
		const requested = await prisma.news.findUnique({
			where: {
				id: `${query.id}`,
			},
		})
		if (!requested)
			/**
			 * Nothing found
			 */
			return res.status(404).json({
				...response,
				success: false,
			})

		return res.status(200).json({
			...response,
			data: [{ ...requested }],
		})
	}

	if (method === 'PUT') {
		/**
		 * Check if user authenticated
		 */
		const session = await getSession({ req })
		if (!session)
			return res.status(403).json({
				...response,
				success: false,
			})

		const user = session.user as User

		/**
		 * Update item
		 */
		const { title, details, id } = body as News
		const updated = await prisma.news.updateMany({
			where: {
				id,
				userId: user.id,
			},
			data: {
				title,
				details,
			},
		})

		if (!updated.count)
			/**
			 * Nothing updated
			 */
			return res.status(400).json({
				...response,
				success: false,
			})
		return res.status(200).json({
			...response,
			data: {
				id,
			},
		})
	}

	return res.status(400).json({
		...response,
		success: false,
	})
}
