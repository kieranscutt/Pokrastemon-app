import React, { useState } from 'react';
import './styles.css';

const HomePage = () => {
  const [isChestOpened, setIsChestOpened] = useState(false);

  const handleChestClick = () => {
    setIsChestOpened(true);
  };

  return (
    <main className="home-page">
      <h2>Welcome to Pokrastemon Adventures, a pokemon themed procrastination app!</h2>
      <h3>Collect pokemon, eggs and chests during study!</h3>
      {/* <div className="outermost-box">
        <div className="outer-box">
          <div className="box-container">
            <div className={`inner-box-study box-content`}>
              <a href="/study">
                <img
                  className="study"
                  src="https://o.remove.bg/downloads/04b76f40-f411-45db-80c8-8e408ac1c934/sum844m4nqc51-removebg-preview.png"
                  alt="Study"
                />
                <span>Study to get keys!</span>
              </a>
            </div>
          </div>
          <div className="box-container">
            <div
              className={`inner-box-chest box-content ${isChestOpened ? 'opened' : ''}`}
              onClick={handleChestClick}
            >
              {isChestOpened ? (
                <img
                  className="pokeball"
                  src="https://file.removal.ai/preview/415efc44-3d0f-4c5a-a359-ad961c61f859-pokeball.png"
                  alt="Pokeball"
                />
              ) : (
                <img
                  className="chest"
                  src="https://pokejungle.net/wp-content/uploads/2022/11/Chest-Tease.png"
                  alt="Chest"
                />
              )} */}
              <span>Open chests to get pokemon!</span>
            {/* </div>
          </div>
        </div>
      </div> */}
    </main>
  );
};

export default HomePage;
