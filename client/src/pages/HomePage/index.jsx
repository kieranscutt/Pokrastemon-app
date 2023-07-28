import React, { useState } from 'react';
import '../../App.css'; 

import timer from '../../images/timer.png';
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
      <div className='welcome'>
        <h2>Welcome to Pokrastémon Adventures, a Pokémon themed procrastination app!</h2>
        <p>Collect Pokémon, eggs and chests during study!</p>
      </div>
      <div className="outermost-box">
        <div className="outer-box">
          <div className="box-container">
            <div
              className={`inner-box-study box-content ${isChestOpened ? 'study-collapsed' : ''}`}
              onClick={handleChestClick}
            >
              <div className="study-container">
                <a href='/study'>
                  <img
                    className={`study ${isChestOpened ? 'collapsed' : ''}`}
                    src={timer}
                    alt="Study"
                  />
                </a>
                <div className="text-container">
                  <span className="study-text">Study to get keys!</span>
                </div>
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
                      />
                    </div>
                    {isChestOpened && (
                      <div className="pokeball">
                        <div className="pokeball__button"></div>
                      </div>
                    )}
                  </div>
                </div>
                {!isChestOpened && (
                 <div className="text-container">
                   <span className="chest-text">Open chests to get Pokémon!</span>
                  </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePageWithSpinner;
