import './todoList.css'

const TodoList = ({ todos, onUpdateTodo }) => {
   return (
      <section>
         <h2 className='header'>My post</h2>
         {todos.map((todo) => (
            <div className="container" >
               <h2
                  key={todo.id}
                  class="title"
               >
                  {todo.title}
               </h2>
               <p className="text">{todo.body}</p>
            </div>
         ))}
      </section>
   );
};

export default TodoList;