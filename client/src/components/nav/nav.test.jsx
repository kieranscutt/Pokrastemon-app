import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import { AuthProvider, KeysProvider, SettingsProvider, PokemonProvider } from '../../contexts';

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
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
  })
  it('renders the login link', () =>{
    const loginLink = screen.getByRole('link', { name: /Log In/i });
    expect(loginLink).toBeInTheDocument();
  })
  it('renders the study link', () =>{
    const studyLink = screen.getByRole('link', { name: /Study/i });
    expect(studyLink).toBeInTheDocument();
  })
  it('renders the profile link', () =>{
    const profileLink = screen.getByRole('link', { name: /Profile/i });
    expect(profileLink).toBeInTheDocument();
  })
  it('renders the library link', () =>{
    const libraryLink = screen.getByRole('link', { name: /Library/i });
    expect(libraryLink).toBeInTheDocument();
  })



})
