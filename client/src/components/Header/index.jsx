import React from 'react'
import { NavLink, Outlet} from 'react-router-dom'

export default function Header() {
  const styles = ({isActive}) => ({
    textDecoration: isActive ? "underline" : "none"
  })
  return (
    <main>
    <header>
        <nav>
            <NavLink to='/' style={styles}>Home</NavLink>
            {/* <NavLink to='/profile' style={styles}>Login</NavLink> */}
            <NavLink to='/study' style={styles}>Study</NavLink>
        </nav>
    </header>
    <Outlet/>
    </main>
  )
}
