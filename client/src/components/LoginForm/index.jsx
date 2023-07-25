import React from 'react'
import { useState } from 'react'

export default function LoginForm(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }


  return (
    <div className='auth-form-container'>
      <h2 className='form-title'>Login</h2>
    <form className='auth-form-login' onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">Password:</label>
      <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type='submit'>Log in</button>
    </form>
     <button className="link-btn" onClick={() => props.onFormSwitch('registerForm')}>Don't have an account? Register here.</button>
    </div>
  ) 
}