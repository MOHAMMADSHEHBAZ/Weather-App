import React, { useEffect, useState } from 'react';
import './Welcome.css';

function Welcome({ onAnimationEnd }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onAnimationEnd();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    visible && (
      <div className="welcome">
        <h1>Daily Weather Updates</h1>
      </div>
    )
  );
}

export default Welcome;
