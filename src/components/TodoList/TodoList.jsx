import React from 'react';
import { Link } from 'react-router-dom';
import './todoList.css';

const TodoList = ({ todos}) => {
   return (
      <section>
         <h2 className='header'>My post</h2>
         {todos.map((todo) => (
            <div className="container" key={todo.id}>
               <Link to={`/posts/${todo.id}`} className="post-link">
                  <h2 className="title">{todo.title}</h2>
               </Link>
            </div>
         ))}
      </section>
   );
};

export default TodoList;
