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
    setId((prevId) => prevId + 1);
    setCountItem((prevCount) => prevCount + 1);
  };

  const removeTask = (id) => {
    const remove = tasks.filter((task) => task.id !== id);
    setTasks(remove);
    setCountItem((prevState) => prevState.countItem - 1);
  };

  const editingTask = (id, newLabel) => {
    if (!newLabel) {
      return;
    }
    const editing = tasks.map((task) =>
      task.id === id ? { ...task, label: newLabel, editing: false } : task
    );
    setTasks(editing);
  };

  const toogleCompleted = (id) => {
    const completed = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(completed);
  };

  const toogleEditing = (id) => {
    const editing = tasks.map((task) =>
      task.id === id ? { ...task, editing: !task.editing } : task
    );
    setTasks(editing);
  };

  const removeCompletedTasks = () => {
    const completedTasks = tasks.filter((task) => !task.completed);
    setTasks(completedTasks);
    setCountItem(completedTasks.length);
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
          tasks={tasks}
          countItem={countItem}
          setCountItem={setCountItem}
          removeCompletedTasks={removeCompletedTasks}
          filter={filter}
          setFilter={setFilter}
        />
      </section>
    </section>
  );
}

export default Todo;
