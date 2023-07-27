import React from 'react';
import '../../App.css';

const LibraryPage = ({ collectedPokemons, isLoggedIn }) => {
  return (
    <div className='pokemon-library'>
      <h1>Welcome to Your Pokémon Library</h1>
      {isLoggedIn ? (
        <>
          {collectedPokemons.length === 0 ? (
            <p>
              You haven't collected any Pokémon yet. Get out there and catch 'em all by opening
              chests from studying!
            </p>
          ) : (
            <>
              <div className='pokemon-grid'>
                <p>Below is a list of Pokémon you have collected on your journey.</p>
              </div>
              <div className='pokemon-card-container'>
                {collectedPokemons.map((pokemon) => (
                  <div key={pokemon.id} className='pokemon-card'>
                    <h2>{pokemon.name}</h2>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                      alt={pokemon.name}
                    />
                    <p>{pokemon.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <p> Please <a className='login-link' href="./login">log in</a> to view your Pokémon library!</p>
      )}
    </div>
  );
};

export default LibraryPage;
