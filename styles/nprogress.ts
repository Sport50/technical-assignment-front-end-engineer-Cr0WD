import { css, keyframes } from '@emotion/react'
import { PropsWithTheme } from '@styles/theme'

const nProgressSpinner = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`

const nProgressStyles = ({ theme }: PropsWithTheme) => css`
	#nprogress {
		pointer-events: none;
		width: 100%;
		position: absolute;
		top: 0;
		z-index: 10000;

		.bar {
			background: ${theme.colors.primary};
			height: 2px;
			left: 0;
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 1031;
		}

		.peg {
			box-shadow: 0 0 10px ${theme.colors.primary}, 0 0 5px ${theme.colors.primary};
			display: block;
			height: 100%;
			opacity: 1;
			position: absolute;
			right: 0;
			transform: rotate(3deg) translate(0px, -4px);
			width: 100px;
		}

		.spinner {
			display: block;
			position: fixed;
			right: 15px;
			top: 15px;
			z-index: 1031;
		}

		.spinner-icon {
			animation: ${nProgressSpinner} 400ms linear infinite;
			border: solid 2px transparent;
			border-left-color: ${theme.colors.primary};
			border-top-color: ${theme.colors.primary};
			border-radius: 50%;

			box-sizing: border-box;
			height: 18px;
			width: 18px;
		}
	}

	.nprogress-custom-parent {
		overflow: hidden;
		position: relative;

		#nprogress {
			.spinner {
				position: absolute;
			}

			.bar {
				position: absolute;
			}
		}
	}
`

export default nProgressStyles
