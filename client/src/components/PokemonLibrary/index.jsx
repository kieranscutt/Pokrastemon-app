import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonLibrary = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Function to fetch data from the Pokemon API
    const fetchPokemonData = async () => {
      try {
        if (token) {
          // If token exists, include it in the authorization header
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          // Make the API request to the Pokemon API
          const response = await axios.get('https://api.pokemon.com/v1/pokemon', config);
          setPokemonData(response.data);
        } else {
          // Handle the case when the user is not logged in
          // For example, redirect to the login page
          // history.push('/login');
        }
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, [token]);

  return (
    <div>
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id}>
          <h3>{pokemon.name}</h3>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
            />
            <p>{pokemon.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonLibrary;
