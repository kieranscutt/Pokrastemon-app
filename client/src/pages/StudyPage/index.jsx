import React from 'react';
import { useState } from 'react';
import { Timer, LootBox } from '../../components';
import SettingsModal from '../../components/SettingsModal';
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
    <div>
      <h1>Study Page</h1>

      <SettingsModal show={modalStatus} handleClose={hideModal}>
        </SettingsModal>

      <Timer />
      <LootBox />
      <button className='settings-btn' onClick={() => showModal()}>Configure your pomodoro</button>
    </div>
  );
};

export default StudyPage;
