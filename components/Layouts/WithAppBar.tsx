import { FC, PropsWithChildren } from 'react'
import { AnimatePresence } from 'framer-motion'
import AppBar from '@components/AppBar/AppBar'
import styled from '@emotion/styled'

const WithAppBar: FC<PropsWithChildren> = ({ children }) => (
	<>
		<AppBar />
		<Content>
			<AnimatePresence exitBeforeEnter initial={false}>
				{children}
			</AnimatePresence>
		</Content>
	</>
)

const Content = styled.div`
	max-width: 1120px;
	width: 100%;
	margin: auto;
	display: flex;
	flex-grow: 2;
	padding: 24px;

	.motionContainer {
		display: grid;
		flex-grow: 2;
		align-content: start;
	}
`

export default WithAppBar
