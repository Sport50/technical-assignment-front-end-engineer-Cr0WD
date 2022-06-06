import Meta from '@components/Layouts/Meta'
import WithMotion from '@components/Layouts/WithMotion'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { NextPageWithProps } from '@interfaces/NextPage'
import WithAppBar from '@components/Layouts/WithAppBar'
import { GetServerSideProps } from 'next'
import withSession, { GetServerSidePropsContextWithSession } from '@helpers/withSession'
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import { useSession } from 'next-auth/react'
import Button from '@components/Button'
import { getRouter } from '@helpers/RouterNexus'
import News from '@api/Models/News'
import { News as NewsType } from '@prisma/client'
import NewsCard from '@components/NewsCard'

const Page: NextPageWithProps<{
	newsList: NewsType[]
}> = ({ newsList }) => {
	const { user } = useSession().data ?? {}
	const labels = useRecoilValue(LabelsAtom).pages.news
	return (
		<WithMotion>
			<Meta title={labels.title} />
			<Title>
				<div>{labels.title}</div>
				{user && (
					<div>
						<Button
							variant="contained"
							endIcon={<AddIcon />}
							onClick={() => {
								getRouter()?.push('/create')
							}}
						>
							{labels.add}
						</Button>
					</div>
				)}
			</Title>
			{newsList.length !== 0 && (
				<NewsCards>
					{newsList.map(item => (
						<NewsCard {...item} key={item.id} />
					))}
				</NewsCards>
			)}
		</WithMotion>
	)
}

const NewsCards = styled.div`
	margin-top: 30px;
	display: grid;
	gap: 20px;
`
const Title = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

Page.getLayout = page => <WithAppBar>{page}</WithAppBar>

export const getServerSideProps: GetServerSideProps = withSession(
	async ({ session }: GetServerSidePropsContextWithSession) => {
		let newsList: NewsType[] = []
		const newsRequest = await News.get(undefined, {
			page: 0,
			pageSize: 5,
		})

		if ('data' in newsRequest) {
			newsList = newsRequest.data
		}

		return {
			props: {
				newsList,
				session,
			},
		}
	}
)

export default Page
