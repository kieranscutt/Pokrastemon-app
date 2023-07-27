import React from 'react';
import { useState } from 'react';
import { Timer, LootBox, SettingsModal, ToDoForm } from '../../components';
import '../../App.css'
import { useAuth } from '../../contexts';

const StudyPage = () => {

  const { token } = useAuth()

  const getRandomPokemon = async() => {
    const resp = await fetch('https://pokrastemon-api.onrender.com/pokemon/random')
    const data = await resp.json()
    if(resp.ok){
      return data.pokemon_id
    } else {
      const num = Math.floor(Math.random*100)
      return num
    }
  }

  const addPokemon = async() => {
    const pokemon_id = await getRandomPokemon()
    const options = {
      method: 'PATCH',
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token || localStorage.getItem('token')
      },
      body: JSON.stringify({
        pokemon_id: pokemon_id
      })
  }
    if(token || localStorage.getItem('token')){
      const resp = await fetch('https://pokrastemon-api.onrender.com/users/pokemon',options)
      const data = await resp.json()
      if (resp.ok){
        console.log(data)
      } else {
        console.log(data)
      }
    }
  }

  const [modalStatus, setModalStatus] = useState(false)
  const showModal = () => {
    setModalStatus(true)
  }
  const hideModal = () => {
    setModalStatus(false)
  }

  return (
    <>
    <div className="study-page">
    <div className='pomodoro-timer'>
      <Timer addPokemon={addPokemon}/>
      <LootBox />
      <SettingsModal show={modalStatus} handleClose={hideModal} />
      <button data-testid="settings-button" className='settings-btn' onClick={() => showModal()}>Configure your pomodoro</button>
    </div>
    <div className="todo">
      <ToDoForm />
    </div>
    </div>
    </>
  );
};

export default StudyPage;
