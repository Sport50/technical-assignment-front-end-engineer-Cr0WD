import LabelsAtom from '@atoms/Labels'
import labels from '@labels'
import { getRouter } from '@helpers/RouterNexus'
import { getRecoil } from '@helpers/RecoilNexus'

const getLabels = () => {
	const locale = getRouter()?.locale ?? 'en'
	return getRecoil(LabelsAtom) ?? labels[locale as keyof typeof labels]
}
export default getLabels
