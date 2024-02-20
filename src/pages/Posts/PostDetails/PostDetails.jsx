import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../../../i18n' 


import classes from './postDetails.module.css'
import { getPost } from '../../../util/api'

const PostDetails = () => {
	const [post, setPost] = useState()
	const { id } = useParams()
	const { t } = useTranslation()

	const baseURL = process.env.REACT_APP_API_URL

	useEffect(() => {
		async function loadPost() {
			try {
				const post = await getPost(id, baseURL)
				setPost(post)
			} catch (err) {
				console.error('Error fetching posts:', err.message)
			}
		}

		loadPost()
	}, [id])

	return (
		<div className={classes['page_container']}>
			{post && (
				<div>
					<h2 className={classes.title}>{post.title}</h2>
					<p className={classes.text}>{post.body}</p>
					<Link to='/posts' className='back_button'>
						{t('post.button')}
					</Link>
				</div>
			)}
		</div>
	)
}

export default PostDetails
