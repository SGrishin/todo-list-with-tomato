import React from 'react';
import cx from 'classnames';
import theme from './App.module.css';
import ToDoList from './components/ToDoList';

function App() {
  return (
    <div className={cx(theme.app)}>
      <h1>ToDo List with Tomatoes</h1>
      <ToDoList />
    </div>
  );
}

export default App;
