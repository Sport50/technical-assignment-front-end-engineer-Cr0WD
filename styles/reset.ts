import { css } from '@emotion/react'

const resetStyles = () => css`
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	address,
	code,
	del,
	dfn,
	em,
	ins,
	q,
	samp,
	small,
	strong,
	sub,
	sup,
	b,
	i,
	hr,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	legend,
	label {
		border: 0;
		margin: 0;
		padding: 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	em,
	small,
	strong,
	sub,
	sup,
	b,
	i {
		font-size: 100%;
	}

	article,
	aside,
	canvas,
	figure,
	figure img,
	figcaption,
	hgroup,
	footer,
	header,
	nav,
	section,
	audio,
	svg,
	img,
	video {
		display: block;
	}

	a img {
		border: 0;
	}

	:focus {
		outline: 0;
	}

	html {
		height: 100%;
	}
`

export default resetStyles
