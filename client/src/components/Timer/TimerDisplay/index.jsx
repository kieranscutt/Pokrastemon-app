import React from 'react'
import { useEffect, useState} from 'react'
import { useAuth, useSettings } from '../../../contexts'

function Display({timer, setTimer, start, setStart, pause}) {

    const [minsPassed, setMinsPassed] = useState(0)

    const { token } = useAuth()
    const { settings } = useSettings()

    if (token){
        setTimer({
            seconds: 0,
            minutes: settings.block_mins % 60,
            hours: (settings.block_mins - (settings.block_mins % 60))/60
        })
    }

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
    
    const addKeys = async() => {
        const options = {
            method: 'PATCH',
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token
            },
        }
        const resp = await fetch('https://pokrastemon-api.onrender.com/users/add-key',options)
        const data = await resp.json()
        if (resp.ok){
            console.log("key added: ",data.keys)
        } else {
            console.log('error:', data)
        }
    }

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
            setMinsPassed(prev=>prev+1)
            if (minsPassed==1 && token){
                addKeys()
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
        setStart(false)
        console.log("Start is now " + start)
    }

    
  return (
    
    <div>
      
        <span role='timer'>{start ? timer.hours: '00'}: </span>
        <span role='timer'>{start ? timer.minutes: '20'}: </span>
        <span role='timer'>{start ? timer.seconds: '00'}</span>
      
    </div>
  )
}

export default Display
