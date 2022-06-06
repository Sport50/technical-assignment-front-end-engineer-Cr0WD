import enLabels from './en/index'

/**
 * Can be added more than one locale
 */
const labels = {
	en: enLabels,
}

export type ILabels = typeof labels
export default labels
