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
          firstName: firstName,
          lastName: lastName
        }),
      }
      const resp = await fetch('https://pokrastemon-api.onrender.com/users/register', options)
      const data = await resp.json()
      if (resp.ok) {
        console.log(data)
        window.location.href = '/login'
      } else {
        console.log(data)
        alert('Username already exists')
      }
   }

    return (
        <div className="auth-form-container">
            <h2 className="form-title">Register</h2>
        <form className="auth-form-register" onSubmit={handleSubmit}>
          <input placeholder="First Name" type="text" id='firstName' value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
          <input placeholder="Last Name" type="text" id='lastName' value={lastName} required onChange={(e) => setLastName(e.target.value)} />
          <input placeholder="Username" type="username" id="username" value={username} required onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Password" type="password" id='password' value={password} required onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>Register</button>
        </form>
         <button className="link-btn" onClick={() => props.onFormSwitch('LoginForm')}>Have an account? Log in here.</button>
        </div> 
    )
}
