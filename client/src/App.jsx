import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageWrapper from './components/pageWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Nav/styles.css';
import { HomePage, LibraryPage, ProfilePage, StudyPage, LoginPage } from './pages';
import NavBar from './components/Nav';

const App = () => {
    const collectedPokemons = [
    // { id: 25, name: 'Pikachu', description: 'An electric-type Pokémon.' },
    // { id: 4, name: 'Charmander', description: 'A fire-type Pokémon.' },
  ];
  return (
    <>
        <NavBar/>
        <PageWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/study' element={<StudyPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/library/:id'  element={<LibraryPage collectedPokemons={collectedPokemons} />} />
            <Route path='/library' element={<LibraryPage collectedPokemons={collectedPokemons} />} />            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </PageWrapper>
    </>
  );
};

export default App;
