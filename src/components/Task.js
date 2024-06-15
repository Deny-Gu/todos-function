import { useEffect, useState } from 'react';

function Task(props) {
  const [input, setInput] = useState(props.label);
  const [defaultInput, setDefaultInput] = useState(props.label);
  const [minutes, setMinutes] = useState(props.min);
  const [seconds, setSeconds] = useState(props.sec);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        } else {
          setSeconds(seconds + 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  const handlerKeyDown = (e) => {
    if (e.code === 'Enter') {
      props.editingTask(props.id, input);
      setDefaultInput(input);
    }
    if (e.code === 'Escape') {
      props.editingTask(props.id, defaultInput);
      setInput(defaultInput);
    }
  };

  const taskCompleted = () => {
    props.toogleCompleted(props.id);
    if (!props.completed) {
      setIsRunning(false);
    }
  };

  let classNames = '';

  if (props.completed) {
    classNames += ' completed';
  }

  if (props.editing) {
    classNames += ' editing';
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={props.completed}
          onClick={() => taskCompleted()}
        />
        <label>
          <span className="title">{props.label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => setIsRunning(true)}></button>
            <button className="icon icon-pause" onClick={() => setIsRunning(false)}></button>
            <span className="timer">{`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</span>
          </span>
          <span className="description">{props.date}</span>
        </label>
        <button className="icon icon-edit" onClick={() => props.toogleEditing(props.id)}></button>
        <button className="icon icon-destroy" onClick={() => props.removeTask(props.id)}></button>
      </div>
      {props.editing === true ? (
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
