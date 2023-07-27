import React from 'react'
import { useState, useEffect } from 'react'
import Display from './TimerDisplay'

export default function Timer() {
    const [start, setStart] = useState(false)
    const [pause, setPause] = useState(false)
    const [timer, setTimer] = useState({})
    const handleStart = (e) =>{
        if (start ==false){     //checks if running for the first time and sets up states
            setStart(true)
            setPause(false)
            e.preventDefault()
            const startTime= {
                seconds: 30,
                minutes: 0,
                hours: 0
            }
            setTimer(startTime)
            
            return <Display timer={timer} setTimer={setTimer} start={start} setStart={setStart} pause={pause}/>
        } else {    //if start button is pushed when it wasn't started for 
            setPause(false)
            return <Display timer={timer} setTimer={setTimer} start={start} setStart={setStart} pause={pause}/>
        }
    }
    const handlePause = () => {
        
        setPause(true)
        setTimer(timer)
        
        return <Display timer={timer} setTimer={setTimer} start={start} setStart={setStart} pause={pause}/>
    }

  return (
    <div className='timer_div' data-testid="timer">

        <h3>Timer</h3>
        <Display timer={timer} setTimer={setTimer} start={start}  setStart={setStart} pause={pause}/>
        <button onClick={handleStart}>Start Timer</button>
        <button onClick={handlePause}>Pause</button>
        
    </div>
  )
}
