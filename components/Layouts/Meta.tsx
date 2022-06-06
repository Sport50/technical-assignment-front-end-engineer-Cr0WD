import { FC, memo, PropsWithChildren } from 'react'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { useRouter } from 'next/router'
import MetaFromObject, { MetaProps, wrapTags } from '@utils/meta/MetaFromObject'
import { useTheme } from '@emotion/react'
import getBasicMeta from '@utils/meta/getBasicMeta'

const Meta: FC<PropsWithChildren<MetaProps>> = ({ title, description, keywords, children }) => {
	const theme = useTheme()
	const router = useRouter()
	const labels = useRecoilValue(LabelsAtom)
	const meta = getBasicMeta({ theme, labels, pathname: router.pathname })
	const metaWrapped = wrapTags({ tags: meta, title, keywords, description, labels })

	return (
		<>
			<Head>{MetaFromObject(metaWrapped)}</Head>
			{children}
		</>
	)
}

export default memo(Meta)
