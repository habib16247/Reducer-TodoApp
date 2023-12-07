import React, { useEffect, useReducer, useState } from "react";
import TaskList from "./TaskList";
import "./TodoStyle.css";
import Add from "../assets/add.png";

const getDataFromLocal = () => {
  const data = localStorage.getItem("taskData") 
  return data ? JSON.parse(data) : []
}

const initialState = {
  taskitems: getDataFromLocal(),
  taskId: 1,
  count: 0,
  completed: false,
};

const taskReducer = (state, action) => {
  if (action.type === "ADD_TASK") {
    return {
      count: state.count + 1,
      taskitems: [
        ...state.taskitems,
        { id: state.taskId, text: action.payload, completed: false },
      ],
      taskId: state.taskId + 1,
    };
  }

  if (action.type === "DELETE_TASK") {
    return {
      taskitems: state.taskitems.filter((task) => task.id !== action.payload),
      taskId: state.taskId,
    };
  }

  if (action.type === "TOGGLE_COMPLETE") {
    return {
      count: action.payload.completed ? state.count - 1 : state.count + 1,
      taskitems: state.taskitems.map((task) =>
        task.id === action.payload.id
          ? { ...task, complete: !task.complete }
          : task
      ),
      taskId: state.taskId,
    };
  }

  if (action.type === "EDIT_TASK") {
    return {
      taskitems: state.taskitems.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.taskText }
          : task
      ),
      taskId: state.taskId,
    };
  }

  return state;
};

const AddTaskForm = () => {

  const [tasks, dispatch] = useReducer(taskReducer,  initialState);



  const [taskText, setTaskText] = useState("");


  const formHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_TASK", payload: taskText });
    setTaskText("");
  };

  const deleteHandler = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  const editHandler = (updatedValue) => {
    const {id,taskText} = updatedValue;
    dispatch({
      type: "EDIT_TASK",
      payload: { id, taskText: taskText },
    });
  };

  const toggleCompleteHandler = (taskId) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: { id: taskId } });
  };

  const isDisabled = taskText.trim() === "";

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(tasks.taskitems))
  }, [tasks.taskitems])

  return (
    <>
      <div className="Container">
        <div className="TodoArea">
          <div className="head">
            <div className="waterMark">
              <img
                src="https://cdn.dribbble.com/users/4241563/screenshots/11874468/media/7796309c77cf752615a3f9062e6a3b3d.gif"
                alt="bg-mark"
              />
            </div>
            <h1>Task Management Application</h1>
          </div>
          <form onSubmit={formHandler}>
            <h2>Input-Tasks: </h2>
            <div className="inputArea">
              <input
                type="text"
                value={taskText}
                placeholder="Enter your task here..."
                onChange={(e) => setTaskText(e.target.value)}
              />

              <button type="submit" disabled={isDisabled}>
                <img src={Add} alt="" />
              </button>
            </div>
          </form>
          <TaskList
            toggleCompleteHandler={toggleCompleteHandler}
            task={tasks.taskitems}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        </div>
      </div>
    </>
  );
};

export default AddTaskForm;
