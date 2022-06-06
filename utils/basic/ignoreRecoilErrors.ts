/**
 * Fix for recoil on dev
 * https://github.com/facebookexperimental/Recoil/issues/733
 */
/* eslint-disable */
const ignoreRecoilErrors = () => {
	if (typeof window === 'undefined') return
	if (process.env.NODE_ENV !== 'development') return
	const mutedConsole = (console: Console) => ({
		...console,
		warn: (...args: any[]) => (args && typeof args[0] === 'string' && args[0].includes('Duplicate atom key') ? null : console.warn(...args)),
		error: (...args: any[]) => (args && typeof args[0] === 'string' && args[0].includes('Duplicate atom key') ? null : console.error(...args))
	})
	global.console = mutedConsole(global.console)
}

export default ignoreRecoilErrors
