// TableView.js
import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../todoList.module.css';

const TableView = ({ todos }) => {

   return (
      <>
         <h2 className={classes['header']}>My posts (Table View)</h2>
         <table>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Title</th>
               </tr>
            </thead>
            <tbody>
               {todos.map((todo) => (
                  <tr key={todo.id}>
                     <td>{todo.id}</td>
                     <td>
                        <Link to={`/posts/${todo.id}`} className={classes.link}>
                           {todo.title}
                        </Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default TableView;
