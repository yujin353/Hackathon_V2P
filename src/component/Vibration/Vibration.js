import React from 'react';

const Vibration = () => {
  const vibrate = () => {
    // Check if the Vibration API is supported by the browser
    if ('vibrate' in navigator) {
      // Vibrate for 200 milliseconds
      navigator.vibrate(200);
    } else {
      console.log('Vibration not supported');
    }
  };

  return (
    <button onClick={vibrate}>
      Vibrate Phone
    </button>
  );
};

export default Vibration;