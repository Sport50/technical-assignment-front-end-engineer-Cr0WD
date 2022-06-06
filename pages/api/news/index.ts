import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@prisma/connection'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const response = {
		success: true,
	}

	const { method, query } = req

	if (method === 'GET') {
		let skip
		let take

		/**
		 * Pagination
		 */
		if (query.pageSize) take = Number(query.pageSize)
		if (query.page) {
			skip = Number(query.page)
			if (!take) take = 5
		}

		const requested = await prisma.news.findMany({
			skip,
			take,
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				User: true,
			},
		})

		if (!requested)
			return res.status(404).json({
				...response,
				success: false,
			})

		return res.status(200).json({
			...response,
			data: requested,
		})
	}

	return res.status(400).json({
		...response,
		success: false,
	})
}
