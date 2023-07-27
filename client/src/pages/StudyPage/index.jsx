import React from 'react';
import { useState } from 'react';
import { Timer, LootBox, SettingsModal, ToDoForm } from '../../components';
import '../../App.css'

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
