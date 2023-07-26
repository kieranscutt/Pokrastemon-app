import React, {useState, useEffect} from "react";

const ToDoItem = ({task, setTodos, todos}) => {

    function deleteTask(task) {
        setTodos((prev) => {
            prev.filter(t => t.text!=task.text)
        })
    }

    function completeTask(task) {
        setTodos(todos.map((el) => {
            if(el == task){
                return {...el,completed:!el.completed}
            }
            return el
        }))
        console.log(task.completed)
    }

    return(
        <li className="todo">
        <span className={`todo-item ${task.completed ? "completed" : ""}`}>
        {task.text}
        </span>
        <button className="delete-btn" >Delete</button>
        <button className="complete-btn" onClick={()=>completeTask(task)}>
        Complete
        </button>
        </li>
    )
}

export default ToDoItem
