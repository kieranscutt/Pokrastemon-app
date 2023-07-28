import React from 'react';
import { useState,useEffect } from 'react';
import { Timer, LootBox, SettingsModal, ToDoForm } from '../../components';
import '../../App.css'
import { useAuth, useMockAuth } from '../../contexts';

const StudyPage = () => {

  let token = ""
  let tokenObj = useAuth()
  if(tokenObj){
    token = useAuth().token
  } else {
    token = useMockAuth().token
  }
  
  

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

    <div className="study-page" data-testid = "studypage">
    <div className='pomodoro-timer' data-testid = "pomodoro-timer">
      <Timer addPokemon={addPokemon}/>
    </div>
    <button data-testid="settings-button" className='settings-btn' onClick={() => showModal()}>Configure your pomodoro</button>
    <div className='study-column'>
    <div className='chest'>
      
      <LootBox />
    </div>
    <div className="todo" data-testid = "todo overall">
      <ToDoForm/>
    </div>
    </div>
    </div>
    <SettingsModal show={modalStatus} handleClose={hideModal} />
    </>
  );
};

export default StudyPage;
