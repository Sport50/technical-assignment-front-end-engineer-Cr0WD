import styled from '@emotion/styled'
import { buttonClasses } from '@mui/material'
import { getRouter } from '@helpers/RouterNexus'
import { ReactComponent as Logo } from '@svg/AppBar/logo.svg'
import UserButton from '@components/AppBar/UserButton'
import Button from '@components/Button'

const AppBar = () => (
	<Container>
		<div className="leftSide">
			<Button
				onClick={() => {
					getRouter()?.push('/')
				}}
			>
				<Logo />
			</Button>
		</div>
		<div className="rightSide">
			<UserButton />
		</div>
	</Container>
)

const Container = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	box-shadow: inset 0px -1px 0px ${({ theme }) => theme.colors.gray};
	padding: 8px 16px;
	align-items: center;

	.rightSide {
		display: grid;
		grid-auto-flow: column;
		gap: 8px;
	}

	.leftSide {
		.${buttonClasses.root} {
			svg {
				width: 32px;
				height: 32px;
			}
		}
	}
`

export default AppBar
