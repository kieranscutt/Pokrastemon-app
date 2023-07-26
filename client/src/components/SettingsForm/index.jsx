import React, {useState, useEffect} from "react"
import '../../App.css'

const SettingsForm = ({handleClose}) => {

  const [settings, setSettings] = useState({})
  const token = localStorage.getItem('token')
  const loggedIn = token ? true : false

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
    if (loggedIn) {
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
        Authorization: token
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
      alert('Settings saved')
    } else {
        console.log(data)
    }
  }

  const handleChange = (e) => {
    const {id, value} = e.target
    setSettings(prev => ({
        ...prev,
        [id]: value
    }))
  }


  return (
    <div className='auth-form-container'>
      <h2 className='form-title'>Pomodoro Settings</h2>

    <form className='auth-form-settings' onSubmit={handleSubmit}>

      <label htmlFor="block_mins">Pomodoro length:</label>
      <input id='block_mins' value={settings.block_mins || 1} onChange={handleChange} />

      <label htmlFor="block_num">Number of pomodoros:</label>
      <input id='block_num' value={settings.block_num || 2} onChange={handleChange} />

      <label htmlFor="short_break_mins">Short break:</label>
      <input id='short_break_mins' value={settings.short_break_mins || 3} onChange={handleChange} />

      <label htmlFor="long_break_mins">Long break:</label>
      <input id='long_break_mins' value={settings.long_break_mins || 4} onChange={handleChange} />

      <button type='submit'>Save</button>
      <button type="button" onClick={handleClose}>Close</button>
    </form>
    </div>
  ) 
}

export default SettingsForm
