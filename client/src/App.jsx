import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/nav/styles.css';
import { HomePage, LibraryPage, ProfilePage, StudyPage, LoginPage } from './pages';
import NavBar from './components/Nav';

const App = () => {
    const collectedPokemons = [
    { id: 25, name: 'Pikachu', description: 'An electric-type Pokémon.' },
    { id: 4, name: 'Charmander', description: 'A fire-type Pokémon.' },
    { id: 7, name: 'Squirtle', description: 'A water-type Pokémon.' },
    { id: 1, name: 'Bulbasaur', description: 'A grass-type Pokémon.' },
    { id: 144, name: 'Articuno', description: 'An ice-type legendary bird Pokémon.' },
    { id: 6, name: 'Charizard', description: 'A fire-type Pokémon.' },
    { id: 150, name: 'Mewtwo', description: 'A psychic-type legendary Pokémon.' },
    { id: 151, name: 'Mew', description: 'A psychic-type mythical Pokémon.' },
    { id: 146, name: 'Moltres', description: 'A fire-type legendary bird Pokémon.' },
    { id: 145, name: 'Zapdos', description: 'An electric-type legendary bird Pokémon.' },
    { id: 143, name: 'Snorlax', description: 'A normal-type Pokémon.' },
    { id: 146, name: 'Moltres', description: 'A fire-type legendary bird Pokémon.' },
    { id: 145, name: 'Zapdos', description: 'An electric-type legendary bird Pokémon.' },
    { id: 143, name: 'Snorlax', description: 'A normal-type Pokémon.' },
    { id: 146, name: 'Moltres', description: 'A fire-type legendary bird Pokémon.' },
    { id: 145, name: 'Zapdos', description: 'An electric-type legendary bird Pokémon.' },
    { id: 143, name: 'Snorlax', description: 'A normal-type Pokémon.' },
    { id: 146, name: 'Moltres', description: 'A fire-type legendary bird Pokémon.' },
    { id: 145, name: 'Zapdos', description: 'An electric-type legendary bird Pokémon.' },
    { id: 143, name: 'Snorlax', description: 'A normal-type Pokémon.' },
    { id: 146, name: 'Moltres', description: 'A fire-type legendary bird Pokémon.' },
    { id: 145, name: 'Zapdos', description: 'An electric-type legendary bird Pokémon.' },

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
            <Route path='/library' element={<LibraryPage collectedPokemons={collectedPokemons} />} />            
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </PageWrapper>
    </>
  );
};

export default App;
