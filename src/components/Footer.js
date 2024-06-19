import TaskFilter from './TaskFilter';

function Footer({ tasks, countItem, setCountItem, filter, setFilter, removeCompletedTasks }) {
  return (
    <footer className="footer">
      <span className="todo-count">{countItem} items left</span>
      <TaskFilter tasks={tasks} filter={filter} setFilter={setFilter} setCountItem={setCountItem} />
      <button className="clear-completed" onClick={removeCompletedTasks}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
