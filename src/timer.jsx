import { useEffect, useState } from "react";

function Stopwatch({ characters }) {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(timer); 
  }, [isRunning, startTime]);

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 100);
    return `${minutes}:${displaySeconds.toString().padStart(2, "0")}.${centiseconds}`;
  };

  useEffect(() => {
    if (characters.length === 0 && !isRunning) {
      startTimer();
    }

    if (characters.length === 3 && isRunning) {
      stopTimer();
    }
  }, [characters.length, isRunning]);
  
  return (
    <div>
      <p>Time: {formatTime(elapsedTime)}</p>
    </div>
  );
}

export default Stopwatch;