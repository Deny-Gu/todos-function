import { useState } from 'react';

function NewTaskForm({ addTask }) {
  const [input, setInput] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const handlerEnter = (e) => {
    if (input.length !== 0) {
      if (e.code === 'Enter') {
        addTask(input, min, sec);
        setInput('');
        setMin('');
        setSec('');
      }
    }
  };

  const handleMin = (e) => {
    if (Number(e.target.value) >= 0 && Number(e.target.value) < 60 && e.target.value.length < 3) {
      setMin(Number(e.target.value));
    }
  };

  const handleSec = (e) => {
    if (Number(e.target.value) >= 0 && Number(e.target.value) < 60 && e.target.value.length < 3) {
      setSec(Number(e.target.value));
    }
  };

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="Task"
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => handlerEnter(e)}
      />
      <input
        className="new-todo-form__timer"
        value={min}
        onChange={(e) => handleMin(e)}
        onKeyDown={(e) => handlerEnter(e)}
        placeholder="Min"
      />
      <input
        className="new-todo-form__timer"
        value={sec}
        onChange={(e) => handleSec(e)}
        onKeyDown={(e) => handlerEnter(e)}
        placeholder="Sec"
      />
    </form>
  );
}

export default NewTaskForm;
