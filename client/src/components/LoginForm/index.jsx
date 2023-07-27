import React from 'react'
import { useState } from 'react'
import '../../App.css'
import { useNavigate } from 'react-router'

import { useAuth } from '../../contexts'

export default function LoginForm(props) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { token,setToken } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    const resp = await fetch('https://pokrastemon-api.onrender.com/users/login', options)
    const data = await resp.json()
    if (resp.ok) {
      localStorage.setItem("token", data.token);
      setToken(data.token)
      console.log(token)
      navigate('/profile')
    } else {
      alert('Incorrect username or password')
    }
  }


  return (
    <div className='auth-form-container'>
      <h2 className='form-title'>Login</h2>
    <form className='auth-form-login' onSubmit={handleSubmit} role='loginForm'>
      <label className='form-label' htmlFor="username">Username:</label>
      <input className='form-input' type="username" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <label className='form-label' htmlFor="password">Password:</label>
      <input className='form-input' type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className='form-btn' type='submit'>Log in</button>
    </form>
     <button className="link-btn" onClick={() => props.onFormSwitch('registerForm')}>Don't have an account? Register here.</button>
    </div>
  ) 
}
