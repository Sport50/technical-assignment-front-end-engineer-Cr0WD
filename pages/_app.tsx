import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import NProgress from 'nprogress'
import Router from 'next/router'
import { Global, ThemeProvider } from '@emotion/react'
import { SnackbarProvider } from 'notistack'
import theme from 'styles/theme'
import GlobalStyles from 'styles/global'
import { WithRouterProps } from 'next/dist/client/with-router'
import labels, { ILabels } from '@labels'
import LabelsAtom from '@atoms/Labels'
import RouterNexus from '@helpers/RouterNexus'
import ignoreRecoilErrors from '@utils/basic/ignoreRecoilErrors'
import { LazyMotion } from 'framer-motion'
import { AppPropsWithLayout } from '@interfaces/NextPage'
import { useEffect } from 'react'
import RecoilNexus, { resetRecoil, setRecoil } from '@helpers/RecoilNexus'
import { SnackbarUtilsConfigurator } from '@helpers/Snackbar'
import { BASE_PATH } from '@constants/envs'
import { Session } from 'next-auth'

import { SessionProvider as AuthProvider } from 'next-auth/react'
import SessionController from '@helpers/SessionController'

/**
 * Fix for annoying recoil messages
 * because of hot module replacement on development mode
 */
ignoreRecoilErrors()

/**
 * Show line on top of the page on loading
 * between screens
 */
let timeout: ReturnType<typeof setTimeout>
NProgress.configure({ showSpinner: false })
Router.events.on(`routeChangeStart`, () => {
	clearTimeout(timeout)
	timeout = setTimeout(() => {
		NProgress.start()
	}, 300)
})
Router.events.on(`routeChangeComplete`, () => {
	clearTimeout(timeout)
	NProgress.done()
})
Router.events.on(`routeChangeError`, () => {
	clearTimeout(timeout)
	NProgress.done()
})

const refetchInterval = Number(process.env.NEXT_PUBLIC_SESSION_REFETCH_INTERVAL ?? 120)
const basePath = process.env.NEXT_PUBLIC_NEXTAUTH_URL ?? `${BASE_PATH}/api/auth`

const muiTheme = createTheme({
	palette: {
		primary: {
			main: theme.colors.primary,
		},
	},
})

export default function MyApp({
	Component,
	pageProps,
	router,
}: AppPropsWithLayout & WithRouterProps) {
	const { session } = (pageProps as { session: Session }) ?? {}

	const currentLocale = (router.locale ?? 'en') as keyof ILabels

	const getLayout = Component.getLayout ?? (page => page)
	const { recoilSetter } = Component

	/**
	 * Update recoil on client-side
	 */
	useEffect(() => {
		if (recoilSetter)
			recoilSetter(
				{ set: setRecoil, reset: resetRecoil } as MutableSnapshot,
				pageProps,
				router
			)
	}, [recoilSetter, router, pageProps])

	return (
		<MuiThemeProvider theme={muiTheme}>
			<ThemeProvider theme={theme}>
				<RouterNexus />
				<CssBaseline />
				<Global styles={GlobalStyles({ theme })} />
				<AuthProvider
					{...{
						refetchInterval,
						session,
						basePath,
					}}
					refetchOnWindowFocus
				>
					<SessionController />
					<RecoilRoot
						initializeState={mutableSnapshot => {
							const { set } = mutableSnapshot
							if (recoilSetter) recoilSetter(mutableSnapshot, pageProps, router)
							set(LabelsAtom, labels[currentLocale])
						}}
					>
						<RecoilNexus />
						{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment       */}
						{/* @ts-ignore https://github.com/iamhosseindhv/notistack/issues/485 */}
						<SnackbarProvider
							maxSnack={10}
							hideIconVariant
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
						>
							<SnackbarUtilsConfigurator />
							<LazyMotion
								features={() =>
									import('@utils/motion/domAnimation').then(res => res.default)
								}
								strict
							>
								{getLayout(<Component {...pageProps} key={router.route} />)}
							</LazyMotion>
						</SnackbarProvider>
					</RecoilRoot>
				</AuthProvider>
			</ThemeProvider>
		</MuiThemeProvider>
	)
}
