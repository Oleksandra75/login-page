import React from 'react'
import { Link } from 'react-router-dom';

const ListView = ({ todos }) => (
   <div>
      <h2 className="header">My posts (List View)</h2>
      {todos.map((todo) => (
         <div className="container" key={todo.id}>
            <Link to={`/posts/${todo.id}`} className="post-link">
               <h2 className="title">{todo.title}</h2>
            </Link>
         </div>
      ))}
   </div>
);

export default ListView