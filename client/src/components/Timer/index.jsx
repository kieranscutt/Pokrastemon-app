import React from 'react'
import { useState, useEffect } from 'react'
import Display from './TimerDisplay'
import { useAuth, useSettings } from '../../contexts'

export default function Timer() {
    const [start, setStart] = useState(false)
    const [pause, setPause] = useState(false)
    const [timer, setTimer] = useState({})

    const { token } = useAuth()
    const { settings } = useSettings()

    const handleStart = (e) =>{
        if (start ==false){     //checks if running for the first time and sets up states
            setStart(true)
            setPause(false)
            e.preventDefault()
            if(token) {
                const startTime = {
                    seconds: 0,
                    minutes: settings.block_mins % 60,
                    hours: (settings.block_mins - (settings.block_mins % 60))/60
                }
                setTimer(startTime)
            } else {
                const startTime= {
                    seconds: 3,
                    minutes: 1,
                    hours: 0
                }
                setTimer(startTime)
            }
            
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
    <div className='timer_div'>

        <h3>Timer</h3>
        <Display timer={timer} setTimer={setTimer} start={start}  setStart={setStart} pause={pause}/>
        <button onClick={handleStart}>Start Timer</button>
        <button onClick={handlePause}>Pause</button>
        
    </div>
  )
}
