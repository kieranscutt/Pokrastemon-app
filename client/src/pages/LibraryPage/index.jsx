import React from 'react';
import './styles.css';

const LibraryPage = ({ collectedPokemons }) => {
  return (
    <div className='pokemon-library'>
      <h1>Welcome to Your Pokémon Library</h1>
      <div className='pokemon-grid'>
        <p>
          {collectedPokemons.length === 0 ? (
            "You haven't collected any Pokémon yet. Get out there and catch 'em all by opening chests from studying!"
          ) : (
            "Below is a list of Pokémon you have collected on your journey. Gotta catch 'em all by opening chests from studying!"
          )}
        </p>
      </div>
      <div className='pokemon-card-container'>
        {collectedPokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
            <p>{pokemon.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
