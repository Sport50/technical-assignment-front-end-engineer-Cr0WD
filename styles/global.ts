import { css } from '@emotion/react'
import { rgba } from 'polished'
import nProgressStyles from '@styles/nprogress'
import resetStyles from '@styles/reset'
import { PropsWithTheme } from '@styles/theme'

const GlobalStyles = ({ theme }: PropsWithTheme) => css`
	${nProgressStyles({ theme })}
	${resetStyles()}
	:root {
		//disable zoom
		touch-action: pan-x pan-y;
		height: 100%;
	}

	* {
		box-sizing: border-box;
		font-family: ${theme.fontFamily} !important;
	}

	body {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;

		#__next {
			flex-grow: 2;
			display: flex;
			flex-direction: column;
			position: relative;
		}

		-webkit-tap-highlight-color: ${rgba(theme.colors.primary, 0.1)};
	}
`

export default GlobalStyles
