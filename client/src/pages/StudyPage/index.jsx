import React from 'react';
import { useState } from 'react';
import { Timer, LootBox } from '../../components';

const StudyPage = () => {
 const [keys, setKeys] = useState(0);
 const [chest, setChest] = useState("closed")


  
  return (
    <div>
      <h1>Study Page</h1>
      <Timer />
      <LootBox />
    </div>
  );
};

export default StudyPage;
