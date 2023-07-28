import React, {useState, useEffect} from "react"
import '../../App.css'
import NumDropdown from "../NumDropdown"
import { useSettings,useAuth, useMockAuth } from "../../contexts"

const SettingsForm = ({handleClose}) => {

  const { settings, setSettings } = useSettings()
  let token = ""
    let tokenObj = useAuth()
    if(tokenObj){
      token = useAuth().token
    } else {
      token = useMockAuth().token
    }

  const getSettings = async () => {
    const options ={
        method: 'GET',
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token || localStorage.getItem('token')
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
    if (token || localStorage.getItem('token')) {
        getSettings()
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const options = {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token || localStorage.getItem('token')
      },
      body: JSON.stringify({
        block_num: settings.block_num,
        block_mins: settings.block_mins,
        short_break_mins: settings.short_break_mins,
        long_break_mins: settings.long_break_mins
      })
    }
    const resp = await fetch('https://pokrastemon-api.onrender.com/users/pomodoro', options)
    const data = await resp.json()
    if (resp.ok) {
        console.log(data)
        alert('Settings saved')
        handleClose()
    } else {
        alert('Please log in to save your settings.')
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setSettings(prev => ({
        ...prev,
        [name]: value
    }))
  }

  return (
    <div className='auth-form-container' data-testid = "settingsForm">
      <h2 className='form-title' data-testid = "pomodoroTitle">Pomodoro Settings</h2>

    <form className='auth-form-settings' data-testid = "pomodoroForm" onSubmit={handleSubmit}>

      {<NumDropdown data-testid='block_num' name='block_num' title='Number of pomodoros:' type='' value={settings.block_num || 4} handleChange={handleChange} min={0} max={100} />}

      {<NumDropdown data-testid='block_mins' name='block_mins' title='Pomodoro length:' type='' value={settings.block_mins || 20} handleChange={handleChange} min={0} max={100} />}

      {<NumDropdown data-testid='short_break_mins' name='short_break_mins' title='Short break length:' type='minutes' value={settings.short_break_mins || 5} handleChange={handleChange} min={0} max={100} />}

      {<NumDropdown data-testid='long_break_mins' name='long_break_mins' title='Long break length:' type='minutes' value={settings.long_break_mins || 15} handleChange={handleChange} min={0} max={100} />}


      <button data-testid ="save" type='submit'>Save</button>
      <button data-testid = "close" type="button" onClick={handleClose}>Close</button>
    </form>
    </div>
  ) 
}

export default SettingsForm
