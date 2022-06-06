import { News } from '@prisma/client'
import request from '@api/Methods/Request'

interface ReturnedId {
	data: {
		id: News['id']
	}
}

const get = (
	id?: News['id'],
	data: {
		page?: number
		pageSize?: number
	} = {}
) =>
	request<
		unknown,
		{
			data: News[]
		}
	>(`/api/news/${id ?? ''}`, {
		data,
	})

const create = (data: Partial<News>) =>
	request<Partial<News>, ReturnedId>('/api/news/create', {
		method: 'POST',
		data,
	})

const update = (data: Partial<News>) =>
	request<Partial<News>, ReturnedId>(`/api/news/${data.id}`, {
		method: 'PUT',
		data,
	})

export default {
	create,
	get,
	update,
}
