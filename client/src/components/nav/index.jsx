// NavBar.js

import React from 'react';
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
    { title: 'Login', path: '/login' },
  ];

  const isLoggedIn = true; 
  const keysCount = "";

  return (
    <Navbar expand="lg" className="navbar-container">
      <Container fluid>
        <Nav>
          <div className="nav-keys">Keys: {keysCount}</div> {/* Add the keys count */}
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
