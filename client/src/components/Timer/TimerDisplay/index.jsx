import React from 'react'
import { useEffect } from 'react'

function Display({timer, setTimer, start, setStart, pause}) {

    //runs when timer is updated or pause and this runs every second
    useEffect(()=>{
        const intervalId= setInterval(()=>{
            if(start && pause){
                setStart = false
                clearInterval(intervalId)
            }
            else if (start && !pause){
                updateTimer()}
            else if (!start && !pause){
                
                clearInterval(intervalId)
            }
        }, 1000)
        return () => clearInterval(intervalId)
    }, [timer, pause, start])


    //
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
        alert("Time's up")
        console.log("timer ended")
        setStart(false)
        console.log("Start is now " + start)
    }

    
  return (
    
    <div>
      
        <span role='timer'>{start ? timer.hours: '0'}: </span>
        <span role='timer'>{start ? timer.minutes: '20'}: </span>
        <span role='timer'>{start ? timer.seconds: '00'}</span>
      
    </div>
  )
}

export default Display
