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
        if (inputText != ""){
            setTodos([...todos,{text:inputText, completed: false}])
            setInputText('')
        }
    }

    return (
        <>
        <div className="todo-form"  data-testid="todo start">
        <form onSubmit={handleSubmit} data-testid = "todoForm">
            <input data-testid = "todoInput" type="text" className='todo-input' value={inputText} onChange={handleInput}/>
            <button data-testid ="todoButton" type="submit" className="todo-btn">Add</button>
        </form>
        </div>
        <ToDoList todos={todos} setTodos={setTodos}/>
        </>
    )
}

export default ToDoForm
