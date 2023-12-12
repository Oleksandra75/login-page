import React, { useState } from 'react';
import './todoList.css';
import { FaList, FaTable } from 'react-icons/fa';
import TableView from './TableView';
import ListView from './ListView';

const TodoList = ({ todos }) => {
   const [viewMode, setViewMode] = useState('list');

   const toggleViewMode = () => {
      setViewMode((prevMode) => (prevMode === 'list' ? 'table' : 'list'));
   };

   return (
      <section>
         <div className="view-mode-toggle">
            <button onClick={toggleViewMode}>{viewMode === 'list' ? <FaTable size={20} /> : <FaList size={20} />}</button>
         </div>
         {viewMode === 'list' ? (
            <ListView todos={todos} />
         ) : (
            <TableView todos={todos} />
         )}
      </section>
   );
};

export default TodoList;

