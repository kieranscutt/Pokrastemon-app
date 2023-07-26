import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/nav/styles.css';
import { HomePage, LibraryPage, ProfilePage, StudyPage, LoginPage } from './pages';
import PageWrapper from './components/pageWrapper';

const App = () => {
    const collectedPokemons = [
      { id: 25, name: 'Pikachu', description: 'An electric-type Pokémon.' },
      { id: 4, name: 'Charmander', description: 'A fire-type Pokémon.' },
      // Add more Pokémon data as needed
    ];
  return (
    <>
          <Routes>
            <Route path ="/" element={<PageWrapper />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path='/study' element={<StudyPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/library' element={<LibraryPage collectedPokemons={collectedPokemons} />} />
              <Route path='/library/:id' element={<LibraryPage collectedPokemons={collectedPokemons} />} />
              <Route path='*' element={<HomePage />} />
            </Route>
          </Routes>
    </>
  );
};

export default App;
