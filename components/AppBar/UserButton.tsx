import { signIn, signOut, useSession } from 'next-auth/react'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { Tooltip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import FaceIcon from '@mui/icons-material/Face'
import Button from '@components/Button'

const UserButton = () => {
	const { user } = useSession().data ?? {}
	const { clickToLogin, clickToLogout, ...labels } = useRecoilValue(LabelsAtom).appbar

	if (user)
		return (
			<Tooltip title={clickToLogout}>
				<Button
					endIcon={<LogoutIcon />}
					onClick={() => {
						signOut()
					}}
				>
					{user.name ?? user.email}
				</Button>
			</Tooltip>
		)

	return (
		<Tooltip title={clickToLogin}>
			<Button
				variant="contained"
				endIcon={<FaceIcon />}
				onClick={() => {
					signIn()
				}}
			>
				{labels.signIn}
			</Button>
		</Tooltip>
	)
}

export default UserButton
