import Meta from '@components/Layouts/Meta'
import WithMotion from '@components/Layouts/WithMotion'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { NextPageWithProps } from '@interfaces/NextPage'
import WithAppBar from '@components/Layouts/WithAppBar'
import { GetServerSideProps } from 'next'
import withSession, { GetServerSidePropsContextWithSession } from '@helpers/withSession'
import styled from '@emotion/styled'
import { News as NewsType } from '@prisma/client'
import url, { absolute } from '@utils/basic/url'
import FromComponent from '@components/FromComponent'
import Button from '@components/Button'
import SaveIcon from '@mui/icons-material/Save'
import { rgba } from 'polished'
import Input from '@components/Input'
import { FC, PropsWithChildren, useState } from 'react'
import { getRecoil } from '@helpers/RecoilNexus'
import { NewsDataUpdater } from '@atoms/Form'
import News from '@api/Models/News'
import { getRouter } from '@helpers/RouterNexus'
import Snackbar from '@helpers/Snackbar'
import getLabels from '@helpers/getLabels'

const handleSubmit = async () => {
	const data = getRecoil(NewsDataUpdater)
	if (Object.values(data).filter(v => v).length === 0) return
	if (!data.id) {
		/**
		 * Create item
		 */
		const create = await News.create(data)
		if (!('data' in create)) return

		const { id } = create.data
		/**
		 * Go to edit page
		 */
		getRouter()?.push(url(`/${id}`))
		Snackbar.success(getLabels().pages.news.form.created)

		return
	}

	/**
	 * Update item
	 */
	const update = await News.update(data)
	if (!('data' in update)) return
	Snackbar.success(getLabels().pages.news.form.updated)
}

const ButtonSubmit: FC<PropsWithChildren> = ({ children }) => {
	const [loading, setLoading] = useState(false)
	return (
		<Button
			variant="contained"
			endIcon={<SaveIcon />}
			type="submit"
			loading={loading}
			onClick={() => {
				;(async () => {
					setLoading(true)
					await handleSubmit()
					setLoading(false)
				})()
			}}
		>
			{children}
		</Button>
	)
}

const Page: NextPageWithProps<{
	newsItem: NewsType | null
}> = ({ newsItem }) => {
	const labels = useRecoilValue(LabelsAtom).pages.news.form

	return (
		<WithMotion>
			<Meta title={newsItem ? newsItem.title : labels.create} />

			<Form
				onSubmit={e => {
					e.preventDefault()
				}}
			>
				<Title>
					<div>{newsItem ? newsItem.title : labels.create}</div>
					<div>
						<ButtonSubmit>{labels.save}</ButtonSubmit>
					</div>
				</Title>
				<div className="formContent">
					<FromComponent name="title">
						<Input {...labels.title} variant="outlined" />
					</FromComponent>
					<FromComponent name="details">
						<Input {...labels.details} variant="outlined" multiline rows={10} />
					</FromComponent>
				</div>
			</Form>
		</WithMotion>
	)
}

const Form = styled.form`
	.formContent {
		margin-top: 20px;
		background-color: ${({ theme }) => rgba(theme.colors.gray, 0.3)};
		padding: 50px;
		display: grid;
		gap: 16px;
	}
`

const Title = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

Page.getLayout = page => <WithAppBar>{page}</WithAppBar>

Page.recoilSetter = ({ set, reset }, { newsItem }) => {
	reset(NewsDataUpdater)
	if (!newsItem) return
	set(NewsDataUpdater, newsItem)
}

export const getServerSideProps: GetServerSideProps = withSession(
	async ({ session, query }: GetServerSidePropsContextWithSession) => {
		if (!session) {
			/**
			 * Not allow seeing edit page for not authenticated users
			 */
			return {
				redirect: {
					destination: absolute('/'),
				},
				props: {},
			}
		}

		let newsItem: NewsType | null = null
		if (query.id !== 'create') {
			const newsItemData = await News.get(`${query.id}`)
			if ('data' in newsItemData) {
				;[newsItem] = newsItemData.data
			}
		}

		return {
			props: {
				newsItem,
				session,
			},
		}
	}
)

export default Page
