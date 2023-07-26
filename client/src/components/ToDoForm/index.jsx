import React, {useState, useEffect} from "react";
import ToDoList from "../ToDoList";

const ToDoForm = () => {
    const [inputText, setInputText] = useState('')
    const [todos, setTodos] = useState([])

    function handleInput(e) {
        setInputText(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setTodos([...todos,{text:inputText, completed: false}])
        setInputText('')
    }

    return (
        <>
        <div className="todo-form">
        <form onSubmit={handleSubmit}>
            <input type="text" className='todo-input' value={inputText} onChange={handleInput}/>
            <button type="submit" className="todo-btn">Add</button>
        </form>
        </div>
        <ToDoList todos={todos} setTodos={setTodos}/>
        </>
    )
}

export default ToDoForm
