import TableView from './TableView/TableView'
import ListView from './ListView/ListView'
import { FaList, FaTable } from 'react-icons/fa'
import { usePostContext } from 'source/PostContext'
import classes from './todoList.module.css'

const TodoList = () => {
  const { posts, viewMode, toggleViewMode } = usePostContext()

  return (
    <section className={classes['posts__container']}>
      <h2 className={classes['header']}>My posts </h2>
      <div className={classes['view_mode_toggle']}>
        <button onClick={toggleViewMode}>
          {viewMode === 'list' ? <FaTable size={20} /> : <FaList size={20} />}
        </button>
      </div>
      {viewMode === 'list' ? (
        <ListView posts={posts} />
      ) : (
        <TableView posts={posts} />
      )}
    </section>
  )
}

export default TodoList
