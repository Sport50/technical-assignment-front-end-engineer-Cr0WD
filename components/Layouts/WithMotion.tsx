import { m as motion, Variants } from 'framer-motion'
import { useTheme } from '@emotion/react'
import { FC, PropsWithChildren } from 'react'

const WithMotion: FC<PropsWithChildren> = ({ children }) => {
	const slideValue = 8

	const theme = useTheme()
	const motionProps = {
		initial: 'hidden',
		exit: 'exit',
		animate: 'visible',
		variants: {
			hidden: { opacity: 0, x: -slideValue },
			visible: { opacity: 1, x: 0 },
			exit: { opacity: 0, x: slideValue },
		} as Variants,
		transition: { type: theme.easing, duration: 0.15 },
	}

	return (
		<motion.div {...motionProps} className="motionContainer">
			{children}
		</motion.div>
	)
}

export default WithMotion
