import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { HomePage, LibraryPage, ProfilePage, StudyPage, LoginPage, RegisterPage } from './pages';
import './App.css'

const App = () => {
  return (
    <>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Pokrastemon Adventures</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href='/study'>Study</Nav.Link>
                <Nav.Link href='/profile'>Profile</Nav.Link>
                <Nav.Link href='/library'>Library</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <PageWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/study' element={<StudyPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/library' element={<LibraryPage />} />
            <Route path='/library/:id' element={<LibraryPage />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </PageWrapper>
      </Router>
    </>
  );
};

export default App;
