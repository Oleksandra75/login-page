import React from 'react'
import { Link } from 'react-router-dom';
import classes from './todoList.module.css';

const ListView = ({ todos }) => (
   <div>
      <h2 className={classes['header']} >My posts (List View)</h2>
      {todos.map((todo) => (
         <div className={classes['container']} key={todo.id}>
            <Link to={`/posts/${todo.id}`} className={classes['post-link']}>
               <h2 className={classes['title']} >{todo.title}</h2>
            </Link>
         </div>
      ))}
   </div>
);

export default ListView