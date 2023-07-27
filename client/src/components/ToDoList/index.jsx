import React from "react";
import ToDoItem from "../ToDoItem";

const ToDoList = ({todos, setTodos}) => {

    return(
        <div className="todo-container">
        <ul className="todo-list">
            {todos.map((task,i) => <ToDoItem setTodos={setTodos} todos={todos} task={task} key={i}/>)}
        </ul>
        </div>
    )
}
export default ToDoList
