/**
 * Data storage
 */
import FormAtomGenerator from '@helpers/FormAtomGenerator'
import { News } from '@prisma/client'

const { AtomUpdater: NewsAtomUpdater, DataUpdater: NewsDataUpdater } = FormAtomGenerator<
	Partial<News>
>('NewsData', {})

export { NewsAtomUpdater, NewsDataUpdater }
