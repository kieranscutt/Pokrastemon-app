import React, { useState } from 'react';
// import './styles.css'; 

import timer from '../../images/timer.png';
// import openChest from '../../images/openChest.png';
// import chest from '../../images/chest.png';

import openChest from '../../images/openChest2.png'
import chest from '../../images/closedChest2.png'

const HomePageWithSpinner = () => {
  const [isChestOpened, setIsChestOpened] = useState(false);

  const handleChestClick = () => {
    setIsChestOpened(!isChestOpened);
  };

  const handlePhotoClick = () => {
    if (isChestOpened) {
      setIsChestOpened(false);
    } else {
      // Add any specific functionality here that needs to be performed when the photo is clicked (if required).
    }
  };

  return (
    <main className="home-page">
      <h2>Welcome to Pokrastemon Adventures, a pokemon themed procrastination app!</h2>
      <h3>Collect pokemon, eggs and chests during study!</h3>
      <div className="outermost-box">
        <div className="outer-box">
          <div className="box-container">
            <div
              className={`inner-box-study box-content ${isChestOpened ? 'study-collapsed' : ''}`}
              onClick={handleChestClick}
            >
              <div className="study-container">
                <img
                  className={`study ${isChestOpened ? 'collapsed' : ''}`}
                  src={timer}
                  alt="Study"
                />
              </div>
              <div className="text-container">
                <span className="study-text">Study to get keys!</span>
              </div>
            </div>
          </div>
          <div className="box-container">
            <div
              className={`inner-box-chest box-content ${isChestOpened ? 'opened' : ''}`}
              onClick={handleChestClick}
            >
              <div className="chest-container">
                <div className={`chest-wrapper ${isChestOpened ? 'opened' : ''}`}>
                  <div className="photo-container" onClick={handlePhotoClick}>
                    <div className={`photo ${isChestOpened ? 'flipped' : ''}`}>
                      <img
                        src={isChestOpened ? openChest : chest}
                        alt={isChestOpened ? 'Open Chest' : 'Chest'}
                        className="open-chest"
                      />
                    </div>
                    {isChestOpened && (
                      <div className="pokeball">
                        <div className="pokeball__button"></div>
                      </div>
                    )}
                  </div>
                  <span className="chest-text">Open chests to get pokemon!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePageWithSpinner;
