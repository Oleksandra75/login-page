import { usePostContext } from '../../source/PostContext'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useTranslation } from 'react-i18next'
import '../../i18n' 
import TodoList from '../TodoList/TodoList'
import classes from './post.module.css'

const Post = () => {
	const { posts, currentPage, totalPages, handlePageChange } = usePostContext()
	const { t } = useTranslation()

	return (
    <div>
      {posts && <TodoList posts={posts} />}
      <div className={classes.wrapper}>
        <button
          className={classes['btn']}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack size={20} />
          <span className={classes.btnText}>{t('post.buttonP')}</span>
        </button>
        <span>
          {t('post.text')} {currentPage} {t('post.separator')} {totalPages}
        </span>
        <button
          className={classes['btn']}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className={classes.btnText}>{t('post.buttonN')}</span>
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  )
}

export default Post
