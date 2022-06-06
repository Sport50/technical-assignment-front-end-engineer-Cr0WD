import { News, User } from '@prisma/client'
import { memo } from 'react'
import { Card as MuiCard } from '@mui/material'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import Button from '@components/Button'
import EditIcon from '@mui/icons-material/Edit'
import { getRouter } from '@helpers/RouterNexus'
import url from '@utils/basic/url'

const NewsCard = ({
	id,
	title,
	details,
	createdAt,
	User: user,
}: News & {
	User?: User
}) => {
	const { user: sessionUser } = useSession().data ?? {}
	const itsMe = sessionUser?.email === user?.email
	return (
		<Card>
			<article>
				<Title>
					<h2>{title}</h2>
					<div>
						{itsMe && (
							<Button
								onClick={() => {
									getRouter()?.push(url(`/${id}`))
								}}
							>
								<EditIcon />
							</Button>
						)}
					</div>
				</Title>
				<div className="info">
					<time dateTime={`${createdAt}`}>
						{dayjs(createdAt).format('DD/MM/YYYY h:mm A')}
					</time>
					{user && (
						<address className="author">
							<a rel="author" href={`mailto:${user.email}`}>
								{user.name ?? user.email}
							</a>
						</address>
					)}
				</div>
				<div className="description">
					<p>{details}</p>
				</div>
			</article>
		</Card>
	)
}

const Title = styled.div`
	padding-bottom: 10px;
	margin-bottom: 10px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
	display: flex;
	justify-content: space-between;
`
const Card = styled(MuiCard)`
	padding: 25px;
	position: relative;

	.info {
		display: flex;
		justify-content: space-between;
	}

	.description {
		border-radius: 6px;
		margin-top: 10px;
		padding: 25px;
		background-color: ${({ theme }) => theme.colors.gray};
		white-space: pre-wrap;
	}

	address {
		font-style: normal;

		a {
			color: currentColor;
		}
	}
`
export default memo(NewsCard)
