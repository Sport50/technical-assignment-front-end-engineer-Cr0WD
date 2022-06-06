import { useRecoilState } from 'recoil'
import { NewsAtomUpdater } from '@atoms/Form'
import { ChangeEvent, cloneElement, FC, PropsWithChildren, ReactElement } from 'react'
import { News } from '@prisma/client'

interface FormComponentProps {
	name: keyof News
}

const FromComponent: FC<PropsWithChildren<FormComponentProps>> = ({ name, children }) => {
	const [value, setValue] = useRecoilState(NewsAtomUpdater(name))
	if (!children) return null
	return cloneElement(children as ReactElement, {
		name,
		value: value ?? '',
		onChange: (e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target?.value)
		},
	})
}

export default FromComponent
