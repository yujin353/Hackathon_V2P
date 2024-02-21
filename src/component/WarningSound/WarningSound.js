import React, { useEffect } from 'react';
import { Howl } from 'howler';

const WarningSound = () => {
    useEffect(() => {
        const soundURL = '/assets/alarm.mp3';
    
        const sound = new Howl({
          src: [soundURL],
          volume: 1,
        });
    
        sound.play();
    
        // 컴포넌트가 언마운트 될 때 소리를 정리합니다.
        return () => {
          sound.stop();
        };
      }, []);
    

  return (
    <div>
      {/* 애플리케이션의 내용 */}
      <p></p>
    </div>
  );
};

export default WarningSound;