import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './components/nav/styles.css';
import { AuthProvider, KeysProvider, SettingsProvider, PokemonProvider } from './contexts';
import './App.css';
import { HomePage, LibraryPage, StudyPage, LoginPage } from './pages';
import NavBar from './components/nav';

const App = () => {

  return (
    <>
      <AuthProvider>
      <KeysProvider>
      <SettingsProvider>
      <PokemonProvider>
      <Routes>
        <Route path="/" element={<NavBar/>}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route
          path="/library"
          element={<LibraryPage />}
        />
        <Route
          path="/library/:id"
          element={<LibraryPage />}
        />
        <Route path="/*" element ={<HomePage/>} />
        </Route>
      </Routes>
      </PokemonProvider>
      </SettingsProvider>
      </KeysProvider>
      </AuthProvider>
    </>
  );
};

export default App;
