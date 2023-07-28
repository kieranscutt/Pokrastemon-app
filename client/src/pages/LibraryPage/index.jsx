import React, { useEffect } from 'react';
import '../../App.css';
import { usePokemon, useAuth, useKeys, useMockAuth} from '../../contexts';

const LibraryPage = () => {

  let token = ""
  let tokenObj = useAuth()
  if(tokenObj){
    token = useAuth().token
  } else {
    token = useMockAuth().token
  }
  const { pokemon, setPokemon } = usePokemon()
  const { setKeys } = useKeys()

  const isLoggedIn = token || localStorage.getItem('token')

  const getPokemon = async() =>{
    const options = {
      method: "GET",
      headers: {
        authorization: token || localStorage.getItem('token'),
      },
    }
    const resp = await fetch('https://pokrastemon-api.onrender.com/users/pokemon',options)
    const data = await resp.json()
    if (resp.ok){
      setPokemon(data)
    } else {
      console.log(data)
    }
  }

  const subtractKeys = async() => {
    const options = {
      method: "PATCH",
      headers: {
        authorization: token || localStorage.getItem('token'),
      },
    }
    const resp = await fetch('https://pokrastemon-api.onrender.com/users/subtract-key',options)
    const data = await resp.json()
    if (resp.ok){
      setKeys(data.keys)
    }
  }

  useEffect(() => {
    if(isLoggedIn){
      subtractKeys()
      getPokemon()
    }
  },[])

  return (
    <div className='pokemon-library'>
      <h1>Welcome to Your Pokémon Library</h1>
      {isLoggedIn ? (
        <>
          {pokemon.length === 0 ? (
            <p data-testid='noPokemons'>
              You haven't collected any Pokémon yet. Get out there and catch 'em all by opening
              chests from studying!
            </p>
          ) : (
            <>
              <div className='pokemon-grid' data-testid='libraryGrid'>
                <p>Below is a list of Pokémon you have collected on your journey.</p>
              </div>
              <div className='pokemon-card-container'>
                {pokemon.map((p,i) => (
                  <div key={i} className='pokemon-card'>
                    <h2>{p.pokemon_name}</h2>
                    <img
                      src={p.front_image_url}
                      alt={p.pokemon_name}
                    />
                    <p>{`Types: ${p.types}`}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <p data-testid='notLoggedInMessage'> Please <a className='login-link' href="./login">log in</a> to view your Pokémon library!</p>
      )}
    </div>
  );
};

export default LibraryPage;
