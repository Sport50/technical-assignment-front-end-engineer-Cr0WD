import { SomeObject } from '@interfaces/SomeObject'
import { createElement, PropsWithChildren, ReactElement } from 'react'

export interface IHeadNode extends PropsWithChildren {
	tag: string
	props?: {
		[variable: string]: string
	}
}

export interface MetaProps {
	title?: string
	description?: string
	keywords?: string
}

export function wrapTags({
	tags,
	title,
	description,
	keywords,
	labels,
}: {
	tags: SomeObject<IHeadNode>
	labels: SomeObject<SomeObject>
} & MetaProps) {
	const { global } = labels

	let titleArray = [global.titleSuffix]
	if (global.siteName) titleArray = [global.siteName, ...titleArray]
	if (title) titleArray = [title, ...titleArray]

	const joinedTitleArray = titleArray.join(`${global.titleDivider}` ?? '|')

	if (keywords) {
		tags.keywords = {
			tag: 'meta',
			props: { name: 'keywords', content: keywords },
		}
	}

	if (description) {
		tags.description = {
			tag: 'meta',
			props: { name: 'description', content: description },
		}
	}

	tags.title = {
		tag: 'title',
		children: joinedTitleArray,
	}

	return tags
}

const MetaFromObject = (items: SomeObject<IHeadNode>) => (
	<>
		{Object.values(items).map((item, index) => {
			const { tag, props, children } = item
			const key = `${item}${index}`

			let additionalElement: ReactElement | undefined

			if (tag === 'title' || props?.name === 'description') {
				additionalElement = createElement('meta', {
					...props,
					name: undefined,
					key: `${key}-additionalElement`,
					property: `og:${props?.name ?? tag}`,
					content: children ?? props?.content ?? undefined,
				})
			}

			return [additionalElement, createElement(tag, { key, ...props }, children)]
		})}
	</>
)

export default MetaFromObject
