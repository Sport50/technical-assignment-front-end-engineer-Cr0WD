/* eslint-disable no-console */
import {
	OptionsObject,
	SnackbarMessage,
	useSnackbar,
	VariantType,
	WithSnackbarProps,
} from 'notistack'
import { FC } from 'react'

interface IProps {
	setUseSnackbarRef?: (showSnackbar: WithSnackbarProps) => void
}

let useSnackbarRef: WithSnackbarProps

export const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
	useSnackbarRef = useSnackbarRefProp
}

export const getUseSnackbarRef = () => useSnackbarRef

export const SnackbarUtilsConfigurator: FC<IProps> = () => {
	setUseSnackbarRef(useSnackbar())
	return null
}

export type SnackbarOptions = OptionsObject

const Snackbar = {
	success(message: SnackbarMessage, options?: SnackbarOptions) {
		this.toast(message, 'success', options)
	},
	warning(message: SnackbarMessage, options?: SnackbarOptions) {
		this.toast(message, 'warning', options)
	},
	info(message: SnackbarMessage, options?: SnackbarOptions) {
		this.toast(message, 'info', options)
	},
	error(message: SnackbarMessage, options?: SnackbarOptions) {
		this.toast(message, 'error', options)
	},
	toast(message: SnackbarMessage, variant: VariantType = 'default', options?: SnackbarOptions) {
		if (!useSnackbarRef) return
		useSnackbarRef.enqueueSnackbar(message, {
			variant,
			...options,
		})
	},
}

export default Snackbar
