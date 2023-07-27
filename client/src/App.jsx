import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './components/nav/styles.css';
import { HomePage, LibraryPage, ProfilePage, StudyPage, LoginPage } from './pages';
import { AuthProvider, KeysProvider, SettingsProvider, PokemonProvider } from './contexts';
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
        <Route path="/profile" element={<ProfilePage />} />
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
