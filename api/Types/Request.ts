import HTTPMethods from '@api/Types/HTTPMethods'

export interface RequestOptions {
	method: string
	headers: HeadersInit
	body?: string
}

export interface RequestProps<T> {
	method?: HTTPMethods
	data?: T
}
