import React from 'react';

const LibraryPage = ({ collectedPokemons }) => {
  if (!collectedPokemons || !Array.isArray(collectedPokemons) || collectedPokemons.length === 0) {
    return (
      <div>
        <h1>My Pokémon Library</h1>
        <p>Welcome, Trainer! You haven't collected any Pokémon yet. Get out there and catch 'em all by studying!</p>
      </div>
    );
  }

  return (
    <div>
      <h1>My Pokémon Library</h1>
      <p>Welcome, Trainer! Below is a list of Pokémon you have collected on your journey. Gotta catch 'em all!</p>
      <div className="pokemon-collection">
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
