import React from 'react';

const LibraryPage = ({ collectedPokemons }) => {
  return (
    <div>
      <h1>Welcome to Your Pokémon Library</h1>
      {collectedPokemons.length === 0 ? (
        <p>You haven't collected any Pokémon yet. Get out there and catch 'em all by opening chests from studying!</p>
      ) : (
        <>
          <p>Below is a list of Pokémon you have collected on your journey. Gotta catch 'em all all by opening chests from studying!</p>
          <div className="pokemon-collection">
            {collectedPokemons.map((pokemon) => (
              <div key={pokemon.id} className="pokemon-card">
                <h2>{pokemon.name}</h2>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
                <p>{pokemon.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LibraryPage;
