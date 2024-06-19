import Task from './Task';

function TaskList({ tasks, filter, removeTask, editingTask, toogleCompleted, toogleEditing }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            label={task.label}
            completed={task.completed}
            editing={task.editing}
            date={task.date}
            filter={filter}
            removeTask={removeTask}
            editingTask={editingTask}
            toogleCompleted={toogleCompleted}
            toogleEditing={toogleEditing}
            min={task.min}
            sec={task.sec}
          />
        );
      })}
    </ul>
  );
}

export default TaskList;
