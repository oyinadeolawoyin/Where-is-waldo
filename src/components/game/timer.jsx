import { useEffect, useState } from "react";
import { useRecords } from "../leaderboard/recordsContext";
import { useNavigate } from "react-router-dom";
import Record from "../leaderboard/record";

function Stopwatch({ characters }) {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { setRecord, setRecords } = useRecords();
  const navigate = useNavigate();

  const startTimer = () => {
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const stopTimer = () => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    setRecord(seconds);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      Record(user.id, seconds, setRecords);
      navigate("/leader board")
    } else{
      navigate("/record page")
    }

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
      {stopTimer && <p>You win! Check your rank.</p>}
      <p>Time: {formatTime(elapsedTime)}</p>
    </div>
  );
}

export default Stopwatch;