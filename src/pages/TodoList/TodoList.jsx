import classes from './todoList.module.css';
import { FaList, FaTable } from 'react-icons/fa';
import { usePostContext } from '../../source/PostContext'
import TableView from './TableView/TableView';
import ListView from './ListView/ListView';
import { useTranslation } from 'react-i18next'
import '../../i18n' 

const TodoList = () => {
   const { posts, viewMode, toggleViewMode } = usePostContext();
   const { t } = useTranslation()

   return (
      <section className={classes['posts__container']}>
         <h2 className={classes['header']} >{t('post.title')} </h2>
         <div className={classes['view_mode_toggle']}>
            <button onClick={toggleViewMode}>
               {viewMode === 'list' ? <FaTable size={20} /> : <FaList size={20} />}
            </button>
         </div>
         {viewMode === 'list' ? <ListView posts={posts} /> : <TableView posts={posts} />}
      </section>
   );
};

export default TodoList;


