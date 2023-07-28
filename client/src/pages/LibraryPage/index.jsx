import React, { useEffect } from 'react';
import '../../App.css';
import { usePokemon, useAuth, useKeys } from '../../contexts';
import { Link } from 'react-router-dom';


const LibraryPage = () => {
  const { token } = useAuth();
  const { pokemon, setPokemon } = usePokemon();
  const { setKeys } = useKeys();

  const isLoggedIn = token || localStorage.getItem('token');

  const getPokemon = async () => {
    const options = {
      method: 'GET',
      headers: {
        authorization: token || localStorage.getItem('token'),
      },
    };
    const resp = await fetch('https://pokrastemon-api.onrender.com/users/pokemon', options);
    const data = await resp.json();
    if (resp.ok) {
      setPokemon(data);
    } else {
      console.log(data);
    }
  };

  const subtractKeys = async () => {
    const options = {
      method: 'PATCH',
      headers: {
        authorization: token || localStorage.getItem('token'),
      },
    };
    const resp = await fetch('https://pokrastemon-api.onrender.com/users/subtract-key', options);
    const data = await resp.json();
    if (resp.ok) {
      setKeys(data.keys);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      subtractKeys();
      getPokemon();
    } else {
      // You can add some code here if needed
    }
  }, []);

  return (
    <div className='pokemon-library'>
      <div className='title-container'>
        <h1 className='library-title'>Welcome to Your Pokémon Library</h1>
      </div>
      {isLoggedIn ? (
        <>
          {pokemon.length === 0 ? (
            <p className='empty-message'>
              You haven't collected any Pokémon yet. Get out there and catch 'em all by opening chests from studying!
            </p>
          ) : (
            <>
              <div className='pokemon-grid'>
                <p className='grid-text'>Below is a list of Pokémon you have collected on your journey.</p>
              </div>
              <div className='pokemon-card-container'>
                {pokemon.map((p, i) => (
                  <div key={i} className='pokemon-card'>
                    <h2>{p.pokemon_name}</h2>
                    <img src={p.front_image_url} alt={p.pokemon_name} />
                    <p>{`Types: ${p.types}`}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <p className='please'>
        Please <Link to='/login' className='login-link'>log in</Link> to view your Pokémon library!
      </p>
      )}
    </div>
  );
};

export default LibraryPage;
