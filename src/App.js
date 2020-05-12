import React from 'react';
import TodoList from './components/TodoList';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <main className={styles.appMain}>
        <div>
          <TodoList/>
        </div>
      </main>
    </div>
  );
}

export default App;
