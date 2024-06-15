import Task from './Task';

function TaskList(props) {
  return (
    <ul className="todo-list">
      {props.tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            label={task.label}
            completed={task.completed}
            editing={task.editing}
            date={task.date}
            removeTask={props.removeTask}
            editingTask={props.editingTask}
            toogleCompleted={props.toogleCompleted}
            toogleEditing={props.toogleEditing}
            min={task.min}
            sec={task.sec}
          />
        );
      })}
    </ul>
  );
}

export default TaskList;
