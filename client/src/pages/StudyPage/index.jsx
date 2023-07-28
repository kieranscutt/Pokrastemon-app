import React from 'react';
import { useState,useEffect } from 'react';
import { Timer, LootBox, SettingsModal, ToDoForm } from '../../components';
import '../../App.css'
import { useAuth, useMockAuth } from '../../contexts';

const StudyPage = () => {

  const [username, setUsername] = useState()

  let token = ""
  let tokenObj = useAuth()
  if(tokenObj){
    token = useAuth().token
  } else {
    token = useMockAuth().token
  }
  
  const getUsername = async() => {
    const options = {
      method: 'GET',
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token || localStorage.getItem('token')
      }
    }
    const resp = await fetch('https://pokrastemon-api.onrender.com/users/user',options)
    const data = await resp.json()
    if (resp.ok){
      console.log(data)
      setUsername(data.username)
    } else {
      console.log(data)
    }
  }

  useEffect(() => {
    if (token||localStorage.getItem('token')){
      getUsername()
    }
  },[])

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

      <div className="study-column">
        <div className="timer-section">
            <div className='pomodoro-timer' data-testid = "pomodoro-timer">
              <Timer addPokemon={addPokemon}/>
            </div>
          <button data-testid="settings-button" className='settings-btn' onClick={() => showModal()}>Configure your pomodoro</button>
        </div>
        <LootBox />
      </div>

      <div className="todo-section">
      <div className="todo" data-testid = "todo overall">
      <h3><b>{username ? `${username}'s` : 'Your'} To Do List:</b></h3>
        <ToDoForm/>
      </div>
      <SettingsModal show={modalStatus} handleClose={hideModal} />
      </div>

    </div>

    {/* <div className='study-column'>

      <div className="timer-section">
        <div className='pomodoro-timer' data-testid = "pomodoro-timer">
          <Timer addPokemon={addPokemon}/>
        </div>
      <button data-testid="settings-button" className='settings-btn' onClick={() => showModal()}>Configure your pomodoro</button>
      </div>
        <LootBox />
    </div>

    <div className="todo" data-testid = "todo overall">
      <ToDoForm/>
    </div>
    <SettingsModal show={modalStatus} handleClose={hideModal} /> */}

    </>
  );
};

export default StudyPage;
