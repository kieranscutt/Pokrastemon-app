import React from 'react'
import { useState, useEffect } from 'react'
// import {TimerButton} from './TimerButton'

export default function Timer() {
    const startTime= {
        seconds: 2,
        minutes: 0,
        hours: 1
    }
    const [timer, setTimer] = useState(startTime)

    useEffect(()=>{
        const intervalId= setInterval(()=>{
            updateTimer()
        }, 1000)
        return () => clearInterval(intervalId)
    }, [timer])

    const updateTimer = () =>{
        let nextTimer = {
            seconds: timer.seconds,
            minutes: timer.minutes,
            hours: timer.hours
        }
        if (timer.seconds == 0 && timer.minutes==0 && timer.hours ==0){
            endTimer()
            

        }else if (timer.minutes==0 && timer.seconds == 0){
            const updatedTimer = {
                seconds: 59,
                minutes: 59,
                hours: nextTimer.hours -1 
            }
            setTimer(updatedTimer)
        } else if (timer.seconds == 0){
            const updatedTimer = {
                seconds: 59,
                minutes: nextTimer.minutes -1,
                hours: nextTimer.hours 
            }
            setTimer(updatedTimer)
        }else{
            const updatedTimer = {
                seconds: (nextTimer.seconds)-1,
                minutes: nextTimer.minutes,
                hours: nextTimer.hours 
            }
            setTimer(updatedTimer)
            nextTimer=updatedTimer
        }
        
        
    }
    const endTimer=()=>{
        console.log("timer ended")
    }

  return (
    <div>

        <h3>Timer</h3>
        
        <span>{timer.hours}: </span>
        <span>{timer.minutes}: </span>
        <span>{timer.seconds}</span>
    </div>
  )
}
