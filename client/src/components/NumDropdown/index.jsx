import React from "react";

const NumDropdown = ({name,title,htmlFor,value,handleChange,min,max,type}) => {
    
    let numbers = []
    for (let i = min; i<=max ; i++){
        numbers = [...numbers,i]
    }

    return (
        <>
            <label htmlFor={htmlFor}>{title}:</label>
            <select name={name} value={value} onChange={handleChange} >
            {numbers.map((i) => <option key={i} value={i}>{i} {type}</option>)}
            </select>
        </>
    )
}

export default NumDropdown
