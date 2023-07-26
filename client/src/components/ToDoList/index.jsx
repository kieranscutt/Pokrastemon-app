import React, {useState, useEffect} from "react";

const ToDoList = () => {

    const [inputText, setInputText] = useState('')
    const [todoList, setTodoList] = useState([])

    function handleInput(e) {
        setInputText(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setTodoList([...todoList,{text:inputText}])
        setInputText('')
    }

    return (
        <div className="todo-form">
        <form onSubmit={handleSubmit}>
            <input type="text" className='todo-input' value={inputText} onChange={handleInput}/>
            <button type="submit" className="todo-btn">Add</button>
        </form>
        </div>
    )
}
export default ToDoList
