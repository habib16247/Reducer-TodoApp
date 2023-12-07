import React, { useEffect, useState } from 'react';

const TaskItem = ({ task, deleteHandler, editHandler, toggleCompleteHandler }) => {
  const [editValue,setEditvalue] = useState('');
  const { id, text, completed } = task;
  const [isChecked, setIsChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    setEditvalue(text)
  }, [text])

  const handlerEdit = () => {
    if (editValue.trim() === "") {
      alert("Please enter your valid task!!!")
    }else {
      editHandler({ id, taskText: editValue });
    }
    setIsEditing(!isEditing);
  };



  const handleChange = (e) => {
    setEditvalue(e.target.value) 
  };

  const editFormHandler = (e) => {
    e.preventDefault();
  }

  const handleKeyDown = (e) => {
    e.preventDefault();
    handlerEdit()
  }

  return (
    <tbody>
      <tr>
        <td>{id}</td>

        {isEditing ? (
          <td>
            <form onSubmit={editFormHandler}>
              <input className='edit' type="text" value={editValue} onChange={handleChange}  />
            </form>
          </td>
        ) : (
          <td style={{ textAlign: "left", textDecoration: isChecked ? "line-through" : "none" }}>{text}</td>
        )}

        <td>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            onClick={() => toggleCompleteHandler(id)}
          />
        </td>

        <td onClick={handlerEdit}>{isEditing ? "♻️" : "✏️"}</td>

        <td onClick={() => deleteHandler(id)}>🗑️</td>
      </tr>
    </tbody>
  );
};

export default TaskItem;
