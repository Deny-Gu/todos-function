import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState(0);
  const [filter, setFilter] = useState('All');
  const [countItem, setCountItem] = useState(0);

  const addTask = (label, min, sec) => {
    setTasks((prevState) => {
      return [
        ...prevState,
        {
          id: id + 1,
          label: label,
          completed: false,
          editing: false,
          date: 'created ' + formatDistanceToNow(new Date(), { addSuffix: true }),
          min: !min ? 0 : min,
          sec: !sec ? 0 : sec,
        },
      ];
    });
    setId(id + 1);
    setCountItem(countItem + 1);
  };

  const removeTask = (id) => {
    let remove = tasks.filter((task) => task.id !== id);
    setTasks(remove);
    setCountItem(countItem - 1);
  };

  const editingTask = (id, newLabel) => {
    if (!newLabel) {
      return;
    }
    let editing = tasks.map((task) =>
      task.id === id ? { ...task, label: newLabel, editing: false } : task
    );
    setTasks(editing);
  };

  const toogleCompleted = (id) => {
    let completed = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(completed);
  };

  const toogleEditing = (id) => {
    let editing = tasks.map((task) =>
      task.id === id ? { ...task, editing: !task.editing } : task
    );
    setTasks(editing);
  };

  const removeCompletedTasks = () => {
    let completedTasks = tasks.filter((task) => !task.completed);
    setTasks(completedTasks);
    setCountItem(completedTasks.length);
  };

  const toggleFilter = (target) => {
    let tasks = document.querySelectorAll('.todo-list li');
    let count = 0;
    if (target === 'Completed') {
      setFilter(target);
      tasks.forEach((li) => {
        if (li.className !== ' completed') {
          li.style.display = 'none';
        } else {
          li.style.display = 'list-item';
          count++;
        }
      });
    }
    if (target === 'Active') {
      setFilter(target);
      tasks.forEach((li) => {
        if (li.className === ' completed') {
          li.style.display = 'none';
        } else {
          li.style.display = 'list-item';
          count++;
        }
      });
    }
    if (target === 'All') {
      setFilter(target);
      tasks.forEach((li) => {
        li.style.display = 'list-item';
        count++;
      });
    }
    setCountItem(count);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={tasks}
          filter={filter}
          removeTask={removeTask}
          editingTask={editingTask}
          toogleCompleted={toogleCompleted}
          toogleEditing={toogleEditing}
        />
        <Footer
          count={countItem}
          removeCompletedTasks={removeCompletedTasks}
          filter={filter}
          toggleFilter={toggleFilter}
        />
      </section>
    </section>
  );
}

export default Todo;
