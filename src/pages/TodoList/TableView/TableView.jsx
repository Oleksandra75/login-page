// TableView.js
import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../todoList.module.css';

const TableView = ({ posts }) => {

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
               {posts.map((post) => (
                  <tr key={post.id}>
                     <td>{post.id}</td>
                     <td>
                        <Link to={`/posts/${post.id}`} className={classes.link}>
                           {post.title}
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
