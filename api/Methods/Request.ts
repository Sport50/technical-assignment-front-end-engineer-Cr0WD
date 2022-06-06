import url from '@utils/basic/url'
import { HOSTNAME } from '@constants/envs'
import { RequestOptions, RequestProps } from '@api/Types/Request'
import { SomeObject } from '@interfaces/SomeObject'
import Snackbar from '@helpers/Snackbar'
import getQueryFromBody from '@utils/basic/getQueryFromBody'

const request = async <T = SomeObject, P = SomeObject>(
	path: string,
	requestProps?: RequestProps<T>
) => {
	const { method = 'GET', data } = requestProps ?? {}

	path = url(`${HOSTNAME ?? ''}${process.env.NEXT_PUBLIC_API_MIDDLEWARE_PREFI ?? ''}${path}`)

	const requestUrl = new URL(path)

	/**
	 * For debug purposes
	 */
	// eslint-disable-next-line no-console
	if (process.env.NODE_ENV === 'development') console.log(`[${method}]`, requestUrl.href)

	const headers: HeadersInit = new Headers()
	headers.set('Accept', 'application/json')
	headers.set('Content-Type', 'application/json')

	const options: RequestOptions = {
		headers,
		method,
	}

	if (data) {
		if (['GET', 'HEAD'].includes(method)) {
			requestUrl.search = getQueryFromBody(data as never)
		} else {
			options.body = JSON.stringify(data)
		}
	}

	const response = await fetch(requestUrl.toString(), options)

	let responseData

	try {
		responseData = await response.json()

		if (!response.ok) {
			const { error } = responseData
			if (error) Snackbar.error(error)

			return {
				error,
			}
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err)
	}

	return responseData as P
}

export default request
