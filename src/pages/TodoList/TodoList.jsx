import React from 'react';
import classes from './todoList.module.css';
import { FaList, FaTable } from 'react-icons/fa';
import { usePostContext } from '../../source/PostContext'
import TableView from './TableView';
import ListView from './ListView';

const TodoList = () => {
   const { todos, viewMode, toggleViewMode } = usePostContext();

   return (
      <section className={classes['posts__container']}>
         <div className={classes['view-mode-toggle']}>
            <button onClick={toggleViewMode}>
               {viewMode === 'list' ? <FaTable size={20} /> : <FaList size={20} />}
            </button>
         </div>
         {viewMode === 'list' ? <ListView todos={todos} /> : <TableView todos={todos} />}
      </section>
   );
};

export default TodoList;


