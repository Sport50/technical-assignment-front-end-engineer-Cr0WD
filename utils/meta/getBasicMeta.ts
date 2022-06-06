import appleTouchIcon from '@png/favicon/apple-touch-icon.png'
import favicon32 from '@png/favicon/favicon-32x32.png'
import favicon16 from '@png/favicon/favicon-16x16.png'
import favicon from '@png/favicon/favicon.png'
import safariPinnedTab from '@svg/favicon/safari-pinned-tab.svg'
import { NextRouter } from 'next/router'
import previewImage from '@png/previewImage.png'
import { ITheme } from '@styles/theme'
import { BASE_PATH, HOSTNAME } from '@constants/envs'
import { SomeObject } from '@interfaces/SomeObject'

type BasicMetaProps = {
	pathname: NextRouter['pathname']
	theme: ITheme
	labels: unknown
}

const getBasicMeta = ({ labels, pathname, theme }: BasicMetaProps) => {
	const {
		global: { siteName, keywords, description, appleMobileWebAppTitle },
	} = labels as SomeObject<SomeObject<string>>

	const adaptive = {
		mobileWebAppCapable: {
			tag: 'meta',
			props: { name: 'mobile-web-app-capable', content: 'yes' },
		},
		handheldFriendly: {
			tag: 'meta',
			props: {
				name: 'HandheldFriendly',
				content: 'true',
			},
		},
		formatDetection: {
			tag: 'meta',
			props: { name: 'format-detection', content: 'telephone=no' },
		},
		layoutMode: { tag: 'meta', props: { name: 'layoutmode', content: 'fitscreen' } },
		imageMode: { tag: 'meta', props: { name: 'imagemode', content: 'force' } },
		browserMode: { tag: 'meta', props: { name: 'browsermode', content: 'application' } },
	}

	const msApplication = {
		msApplicationConfig: {
			tag: 'meta',
			props: {
				name: 'msapplication-config',
				content: `${BASE_PATH}/browserconfig.xml`,
			},
		},
		msApplicationTapHighlight: {
			tag: 'meta',
			props: { name: 'msapplication-tap-highlight', content: 'no' },
		},
		msApplicationTileColor: {
			tag: 'meta',
			props: { name: 'msapplication-TileColor', content: theme.colors.primary },
		},
	}

	const openGraph = {
		openGraphUrl: {
			tag: 'meta',
			props: { property: 'og:url', content: `${HOSTNAME}${pathname}` },
		},
		openGraphImage: {
			tag: 'meta',
			props: {
				property: 'og:image',
				content: `${HOSTNAME}/${`${previewImage}`.replace(`${BASE_PATH}/`, '')}`,
			},
		},
		openGraphSiteName: {
			tag: 'meta',
			props: { property: 'og:site_name', content: siteName },
		},
	}

	const icon = {
		maskIcon: {
			tag: 'link',
			props: { rel: 'mask-icon', href: safariPinnedTab, color: theme.colors.text },
		},
		icon: { tag: 'link', props: { rel: 'shortcut icon', href: favicon } },
		appleTouchIcon: {
			tag: 'link',
			props: { rel: 'apple-touch-icon', href: appleTouchIcon, sizes: '180x180' },
		},
		icon32: {
			tag: 'link',
			props: { rel: 'icon', href: favicon32, sizes: '32x32', type: 'image/png' },
		},
		icon16: {
			tag: 'link',
			props: { rel: 'icon', href: favicon16, sizes: '16x16', type: 'image/png' },
		},
	}
	const apple = {
		appleMobileWebAppCapable: {
			tag: 'meta',
			props: { name: 'apple-mobile-web-app-capable', content: 'yes' },
		},
		appleMobileWebAppStatusBarStyle: {
			tag: 'meta',
			props: { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
		},
		appleMobileWebAppTitle: {
			tag: 'meta',
			props: {
				name: 'apple-mobile-web-app-title',
				content: appleMobileWebAppTitle,
			},
		},
	}
	return {
		viewport: {
			tag: 'meta',
			props: {
				name: 'viewport',
				content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no',
			},
		},
		title: { tag: 'title', children: siteName },
		keywords: { tag: 'meta', props: { name: 'keywords', content: keywords } },
		description: {
			tag: 'meta',
			props: { name: 'description', content: description },
		},
		...adaptive,
		...msApplication,
		...icon,
		...icon,
		...openGraph,
		...apple,
		themeColor: { tag: 'meta', props: { name: 'theme-color', content: theme.colors.white } },
		manifest: {
			tag: 'link',
			props: {
				rel: 'manifest',
				href: `${BASE_PATH}/site.webmanifest`,
			},
		},
	}
}

export default getBasicMeta
