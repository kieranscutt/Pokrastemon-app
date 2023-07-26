import React from 'react';
import { useState } from 'react';
import { Timer, LootBox, SettingsModal, ToDoList, ToDoForm } from '../../components';
import './styles.css'

const StudyPage = () => {

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
      <Timer />
      <LootBox />
      <SettingsModal show={modalStatus} handleClose={hideModal} />
      <button className='settings-btn' onClick={() => showModal()}>Configure your pomodoro</button>
    </div>
    <div className="todo">
      <ToDoForm />
    </div>
    </div>
    </>
  );
};

export default StudyPage;
