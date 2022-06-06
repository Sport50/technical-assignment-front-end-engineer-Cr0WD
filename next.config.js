// noinspection JSValidateTypes

/** @type {import('next').NextConfig} */
const { withPlugins } = require('next-compose-plugins')
const basePath = process.env.NEXT_PUBLIC_BASE_PATH

const nextConfig = {
	basePath,
	assetPrefix: basePath,
	reactStrictMode: true,
	images: {
		disableStaticImages: true,
	},
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	future: {
		strictPostcssConfiguration: true,
	},
	swcMinify: process.env.NODE_ENV === 'production',
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		config.module.rules.push({
			test: /\.(png|gif|svg)$/i,
			issuer: /\.[jt]sx?$/,
			loader: 'file-loader',
			options: {
				outputPath: 'static/images/',
			},
		})

		return config
	},
}


const noRecoilMessagesOnDevelopment = ( nextConfig ) => {
	if (process.env.NODE_ENV === 'development'){
		require('intercept-stdout')((text) => (text.includes('Duplicate atom key') ? '' : text))
	}
	return { ...nextConfig }
}

const plugins = [
	noRecoilMessagesOnDevelopment,
]

module.exports = withPlugins(plugins, nextConfig)

