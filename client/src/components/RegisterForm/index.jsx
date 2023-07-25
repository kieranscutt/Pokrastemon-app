import React, {useState} from "react"
import '../../App.css'

export default function RegisterForm(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault()
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
      const resp = await fetch('http://localhost:3000/users/register', options)
      const data = await resp.json()
      if (resp.ok) {
        console.log(data)
        window.location.href = '/login'
      } else {
        alert('This username is already taken')
      }
   }

    return (
        <div className="auth-form-container">
            <h2 className="form-title">Register</h2>
        <form className="auth-form-register" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <label htmlFor="lastName">Last name:</label>
          <input type="text" id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <label htmlFor="username">Username:</label>
            <input type="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="password">Password:</label>
          <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>Register</button>
        </form>
         <button className="link-btn" onClick={() => props.onFormSwitch('LoginForm')}>Have an account? Log in here.</button>
        </div> 
    )
}
