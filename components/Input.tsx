import styled from '@emotion/styled'
import { inputLabelClasses, TextField } from '@mui/material'

const Input = styled(TextField)`
	& {
		.${inputLabelClasses.root} {
			line-height: 170%;
		}
	}
`

export default Input
