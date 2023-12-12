import React from 'react'
import { Link } from 'react-router-dom';

const TableView = ({ todos }) => (
   <>
   <h2 className="header">My posts (Table View)</h2>
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
                     <Link to={`/posts/${todo.id}`} className="post-link">
                        {todo.title}
                     </Link>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   </>
);

export default TableView