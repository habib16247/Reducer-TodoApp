import React from 'react'
import TaskItem from './TaskItem'
import empty from "../assets/folder (1).png"

const TaskList = ({task, deleteHandler, editHandler , toggleCompleteHandler, setTaskText}) => {
  
  return (
    <div className='taskList'>
        <div className="counter">
            <h3>Total-Task: {task.length}, </h3>
            <h3>Complete-Task: {task.filter(taskItem => taskItem.complete).length}</h3>
        </div>
        {
          task.length > 0 ? (
            <table>
              <thead>
                <th>id</th>
                <th>task</th>
                <th>Completed</th>
                <th>Edit</th>
                <th>Delete</th>
              </thead>
                {
                  task.map(taskItem => <TaskItem key={taskItem.id} toggleCompleteHandler={toggleCompleteHandler} task={taskItem} deleteHandler={deleteHandler} editHandler={editHandler} />)
                } 
            </table>
          ) : (
            <div className="empty">
              <img className='empty-img' src={empty} alt="Empty" />
              <h3>Task Management Table is Empty!!!</h3>
            </div>
          )
        }
        
    </div>
  )
}

export default TaskList