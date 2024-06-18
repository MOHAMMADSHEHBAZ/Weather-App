import React, { useState } from 'react';
import './App.css';
import Welcome from './Welcome';
import Weatherbox from './components/Weatherbox';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleAnimationEnd = () => {
    setShowWelcome(false);
  };
  return (
    <>
      {showWelcome ? (
        <Welcome onAnimationEnd={handleAnimationEnd} />
      ) :(
      <Weatherbox/>
      )};  
      </>
  );
}

export default App;
