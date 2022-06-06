import { SomeObject } from '@interfaces/SomeObject'

function getQueryFromBody(data: SomeObject) {
	let searchQuery = '?'
	Object.keys(data).forEach(property => {
		searchQuery += `${property}=${data[property]}&`
	})
	return searchQuery.substring(0, searchQuery.length - 1)
}

export default getQueryFromBody
