import { useEffect } from 'react';

function TaskFilter({ tasks, filter, setFilter, setCountItem }) {
  useEffect(() => {
    if (filter === 'Completed') {
      const count = tasks.filter((task) => task.completed);
      setCountItem(count.length);
    }
    if (filter === 'Active') {
      const count = tasks.filter((task) => !task.completed);
      setCountItem(count.length);
    }
    if (filter === 'All') {
      setCountItem(tasks.length);
    }
  });

  return (
    <ul className="filters">
      <li>
        <button className={filter === 'All' ? 'selected' : null} onClick={() => setFilter('All')}>
          All
        </button>
      </li>
      <li>
        <button
          className={filter === 'Active' ? 'selected' : null}
          onClick={() => setFilter('Active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'Completed' ? 'selected' : null}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TaskFilter;
