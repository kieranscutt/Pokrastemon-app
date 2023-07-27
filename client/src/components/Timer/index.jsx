import React from 'react'
import { useState, useEffect } from 'react'
import Display from './TimerDisplay'

export default function Timer() {
    const [start, setStart] = useState(false)
    const [pause, setPause] = useState(false)
    const [timer, setTimer] = useState({})

    const token = localStorage.getItem('token')
    const loggedIn = token ? true : false

    const [keys, setKeys] = useState(0)
    const [settings, setSettings] = useState({})

    const getKeys = async() => {
        const options ={
            method: 'GET',
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token
            },
        }
        const resp = await fetch('https://pokrastemon-api.onrender.com/users/user', options)
        const data = await resp.json()
        if (resp.ok) {
            setKeys(data.keys)
        } else {
            console.log(data)
        }
    }

    const getSettings = async () => {
        const options ={
            method: 'GET',
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token
            },
        }
        const resp = await fetch('https://pokrastemon-api.onrender.com/users/pomodoro', options)
        const data = await resp.json()
        if (resp.ok) {
            setSettings(prev => ({
                ...prev,
                block_num: data.block_num,
                block_mins: data.block_mins,
                short_break_mins: data.short_break_mins,
                long_break_mins: data.long_break_mins
            }))
        } else {
            console.log(data)
        }
    }

    useEffect(() => {
        if(loggedIn){
            getSettings()
            getKeys()
        }
    },[])

    const handleStart = (e) =>{
        if (start ==false){     //checks if running for the first time and sets up states
            setStart(true)
            setPause(false)
            e.preventDefault()
            // const startTime = {
            //     seconds: 0,
            //     minutes: settings.block_mins % 60,
            //     hours: (settings.block_mins - (settings.block_mins % 60))/60
            // }
            const startTime= {
                seconds: 3,
                minutes: 1,
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
    <div className='timer_div'>

        <h3>Timer</h3>
        <Display timer={timer} setTimer={setTimer} start={start}  setStart={setStart} pause={pause}/>
        <button onClick={handleStart}>Start Timer</button>
        <button onClick={handlePause}>Pause</button>
        
    </div>
  )
}
