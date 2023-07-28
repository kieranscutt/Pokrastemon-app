import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import { MockAuthProvider, AuthProvider, KeysProvider, SettingsProvider, PokemonProvider } from '../../contexts';

import NavBar from '.';
import App from '../../App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

describe('Navbar', () => {
  beforeEach(() => {
    render(
      <Router>
      <AuthProvider>
        <KeysProvider>
          <SettingsProvider>
            <PokemonProvider>
      <Routes>
        <Route path="/" element={<NavBar/>}/>
      </Routes> 
      </PokemonProvider>
      </SettingsProvider>
      </KeysProvider>
      </AuthProvider>  
      </Router>
    );
  });

  afterEach(() => {
    cleanup();
  });
  it('renders the home link', () =>{
    const homeLink = screen.getByRole('button', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
  })
  it('renders the login link', () =>{
    const loginLink = screen.getByRole('button', { name: /Log In/i });
    expect(loginLink).toBeInTheDocument();
  })
  it('renders the study link', () =>{
    const studyLink = screen.getByRole('button', { name: /Study/i });
    expect(studyLink).toBeInTheDocument();
  })
  it('renders the library link', () =>{
    const libraryLink = screen.getByRole('button', { name: "Library" });
    expect(libraryLink).toBeInTheDocument();
  })

})

describe("navbar with tokens", () => {
  beforeEach(() => {
    render(
      <Router>
      <MockAuthProvider>
        <KeysProvider>
          <SettingsProvider>
            <PokemonProvider>
      <Routes>
        <Route path="/" element={<NavBar/>}/>
      </Routes> 
      </PokemonProvider>
      </SettingsProvider>
      </KeysProvider>
      </MockAuthProvider>  
      </Router>
    );
  });

  afterEach(() => {
    cleanup();
  });
  it('renders the home link', () =>{
    const homeLink = screen.getByRole('button', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
  })
  it('renders the login link', () =>{
    const loginLink = screen.getByRole('button', { name: /Log Out/i });
    expect(loginLink).toBeInTheDocument();
  })
  it('renders the study link', () =>{
    const studyLink = screen.getByRole('button', { name: /Study/i });
    expect(studyLink).toBeInTheDocument();
  })
  it('renders the library link', () =>{
    const libraryLink = screen.getByRole('button', { name: "Library" });
    expect(libraryLink).toBeInTheDocument();
  })

  it("should logout upon logout being clicked", () => {
    
  })
})
