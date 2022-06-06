import { atom } from 'recoil'
import labels from '@labels'

const LabelsAtom = atom<typeof labels['en']>({
	key: 'labels',
	default: labels.en,
})

export default LabelsAtom
