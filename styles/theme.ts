import '@emotion/react'

const easing = `cubic-bezier(0.4, 0, 0.2, 1)`
const easingDuration = `0.15s`
const basicTransition = `${easingDuration} ${easing}`

const theme = {
	fontFamily: `'Inter', Helvetica, Arial, sans-serif`,
	easing,
	easingDuration,
	basicTransition,
	colors: {
		white: `#ffffff`,
		gray: `#EFF0F2`,
		text: `#2B2A40`,
		primary: `#273BF4`,
	},
}

/**
 * Extend style-components with theme type
 */
export type ITheme = typeof theme
declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface Theme extends ITheme {}
}

export type PropsWithTheme<T = unknown> = T & {
	theme: ITheme
}

export default theme
