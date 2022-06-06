import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { MutableSnapshot } from 'recoil'
import { AppProps } from 'next/app'
import { NextRouter } from 'next/router'
import { SomeObject } from '@interfaces/SomeObject'

export type NextPageWithProps<P = SomeObject, IP = P> = NextPage<P, IP> & {
	/**
	 * Layout type
	 */
	getLayout?: (page: ReactElement) => ReactNode
	recoilSetter?: (
		mutableSnapshot: MutableSnapshot,
		pageProps: Partial<P>,
		router?: NextRouter
	) => void
}
export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithProps
}
