// NavBar.js

import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './styles.css';

const NavBar = () => {
  const location = useLocation();
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Study', path: '/study' },
    { title: 'Profile', path: '/profile' },
    { title: 'Library', path: '/library' },
  ];

  const [keyCount,setKeyCount] = useState(0)
  const isLoggedIn = localStorage.getItem('token') ? true : false

  useEffect(() => {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        authorization: token,
      },
    }
    fetch('https://pokrastemon-api.onrender.com/users/user', options)
    .then(resp => resp.json())
    .then(data => {
      setKeyCount(data.keys)
    })
  },[])

  const showKeys = () => {
    const key = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/></svg>'
    return (<div dangerouslySetInnerHTML={{ __html: key.repeat(keyCount)}}></div>)
    }

  const keys = showKeys()

  return (
    <Navbar expand="lg" className="navbar-container">
      <Container fluid>
        <Nav>
          <div className="nav-keys">{keys}</div> {/* Add the keys count */}
        </Nav>
        <Navbar.Brand href="/">Pokrastemon Adventures</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {navLinks.map((link) => (
              <Nav.Link key={link.path} href={link.path} className={location.pathname === link.path ? 'active' : ''}>
                {link.title}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link href="/logout" className={location.pathname === '/logout' ? 'active' : ''}>
                Log Out
              </Nav.Link>
            ) : (
              <Nav.Link href="/login" className={location.pathname === '/login' ? 'active' : ''}>
                Log In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
