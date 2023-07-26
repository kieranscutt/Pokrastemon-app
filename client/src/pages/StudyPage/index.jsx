import React from 'react';
import { useState } from 'react';
import { Timer, LootBox } from '../../components';
import SettingsModal from '../../components/SettingsModal';
import './styles.css'

const StudyPage = () => {
<<<<<<< HEAD
 const [keys, setKeys] = useState(0);
 const [chest, setChest] = useState("closed")
=======

  const [modalStatus, setModalStatus] = useState(false)
 
  const showModal = () => {
    setModalStatus(true)
  }
>>>>>>> bf4e7f7c1366d084e10450f794adaf403dfe3f40

  const hideModal = () => {
    setModalStatus(false)
  }

  return (
    <div>
      <h1>Study Page</h1>

      <SettingsModal show={modalStatus} handleClose={hideModal}>
        </SettingsModal>

      <Timer />
      {/* <LootBox /> */}
      <button className='settings-btn' onClick={() => showModal()}>Configure your pomodoro</button>
    </div>
  );
};

export default StudyPage;
