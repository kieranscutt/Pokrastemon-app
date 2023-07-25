import React from 'react'
import { useState } from 'react'
import '../../App.css'

export default function LoginForm(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }


  return (
    <div className='auth-form-container'>
      <h2 className='form-title'>Login</h2>
    <form className='auth-form-login' onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="username" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password:</label>
      <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type='submit'>Log in</button>
    </form>
     <button className="link-btn" onClick={() => props.onFormSwitch('registerForm')}>Don't have an account? Register here.</button>
    </div>
  ) 
}
