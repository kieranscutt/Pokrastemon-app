import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './styles.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" className='navbar-container'>
      <Container>
        <Navbar.Brand href="/">Pokrastemon Adventures</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link href="/" className={location.pathname === '/' ? 'active' : ''}>Home</Nav.Link>
          <Nav.Link href="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Nav.Link>
          <Nav.Link href='/study' className={location.pathname === '/study' ? 'active' : ''}>Study</Nav.Link>
          <Nav.Link href='/profile' className={location.pathname === '/profile' ? 'active' : ''}>Profile</Nav.Link>
          <Nav.Link href='/library' className={location.pathname === '/library' ? 'active' : ''}>Library</Nav.Link>
          </Nav>
            
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
