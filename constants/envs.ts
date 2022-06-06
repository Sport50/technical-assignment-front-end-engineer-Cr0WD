/* eslint-disable import/prefer-default-export */
export const HOSTNAME =
	process.env.NEXT_PUBLIC_HOST ?? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
