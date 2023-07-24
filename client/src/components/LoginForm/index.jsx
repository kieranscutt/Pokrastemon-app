import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username"></label>
      <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
    </form>
  )
}
