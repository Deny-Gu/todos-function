import { useEffect, useRef, useState } from 'react';

function Task({
  id,
  label,
  min,
  sec,
  completed,
  editing,
  date,
  filter,
  removeTask,
  editingTask,
  toogleCompleted,
  toogleEditing,
}) {
  const [input, setInput] = useState(label);
  const [defaultInput, setDefaultInput] = useState(label);
  const [minutes, setMinutes] = useState(min);
  const [seconds, setSeconds] = useState(sec);
  const [isRunning, setIsRunning] = useState(false);

  const refInterval = useRef(null);

  useEffect(() => {
    if (isRunning) {
      refInterval.current = setInterval(() => {
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        } else {
          setSeconds(seconds + 1);
        }
      }, 1000);
    }

    return () => clearInterval(refInterval.current);
  }, [isRunning, minutes, seconds]);

  const handlerKeyDown = (e) => {
    if (e.code === 'Enter') {
      editingTask(id, input);
      setDefaultInput(input);
    }
    if (e.code === 'Escape') {
      editingTask(id, defaultInput);
      setInput(defaultInput);
    }
  };

  const taskCompleted = () => {
    toogleCompleted(id);
    if (!completed) {
      setIsRunning(false);
    }
  };

  const style = {};
  const classNames = [];

  if (completed && filter !== 'Completed') {
    style.display = 'none';
  }

  if (!completed && filter === 'Completed') {
    style.display = 'none';
  }

  if (filter === 'All') {
    style.display = '';
  }

  if (completed) {
    classNames.push('completed');
  }

  if (editing) {
    classNames.push('editing');
  }

  return (
    <li className={classNames.join(' ')} style={style}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={completed}
          onClick={() => taskCompleted()}
        />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => setIsRunning(true)}></button>
            <button className="icon icon-pause" onClick={() => setIsRunning(false)}></button>
            <span className="timer">{`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</span>
          </span>
          <span className="description">{date}</span>
        </label>
        <button className="icon icon-edit" onClick={() => toogleEditing(id)}></button>
        <button className="icon icon-destroy" onClick={() => removeTask(id)}></button>
      </div>
      {editing === true ? (
        <input
          className="edit"
          type="text"
          onKeyDown={(e) => handlerKeyDown(e)}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          autoFocus
        />
      ) : null}
    </li>
  );
}

export default Task;
