import React from 'react'

export default function TimerButton() {
    const startTimer = () =>{
        console.log("hi")
    }
  return (
    <div>
        <button onClick={startTimer}></button>
    </div>
  )
}

