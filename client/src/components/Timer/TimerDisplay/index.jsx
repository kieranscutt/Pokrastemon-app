import React from 'react'
import { useEffect, useState} from 'react'
import { useAuth, useSettings, useKeys } from '../../../contexts'

function Display({timer, setTimer, start, setStart, pause, addPokemon}) {

    const [minsPassed, setMinsPassed] = useState(0)
    const { token } = useAuth()
    const { settings } = useSettings()
    const { keys, setKeys } = useKeys()

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
            Authorization: token || localStorage.getItem('token')
            },
        }
        const resp = await fetch('https://pokrastemon-api.onrender.com/users/add-key',options)
        const data = await resp.json()
        if (resp.ok){
            if(data.keys%3==0){
                alert('You received 3 keys and opened the chest! Check out your new pokemon in the library page.')
                addPokemon()
            }
            setKeys(data.keys)
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
            setTimer(updatedTimer)
        }else{
            const updatedTimer = {
                seconds: (nextTimer.seconds)-1,
                minutes: nextTimer.minutes,
                hours: nextTimer.hours 
            }
            setMinsPassed(prev=>prev+1)
            if ((minsPassed%5==0) && (minsPassed!=0) && (token||localStorage.getItem('token'))){
                addKeys()
            }
            setTimer(updatedTimer)
            nextTimer=updatedTimer
        }
        
        
    }
    const endTimer=()=>{
        alert("Time's up")
        setStart(false)
    }
    
  return (
    
    <div data-testid = "timerDiv">
      
        <span role='timer'>{start ? timer.hours: (settings.block_mins - (settings.block_mins % 60))/60 || '00'}: </span>
        <span role='timer'>{start ? timer.minutes: settings.block_mins % 60 || '20'}: </span>
        <span data-testid="seconds" role='timer'>{start ? timer.seconds: '00'}</span>

      
    </div>
  )
}

export default Display
