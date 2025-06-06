import { useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import Stopwatch from './timer';

function Game() {
  const location = useLocation();
  const { characters, image } = location.state || {};
  
  const [pixel, setPixel] = useState({ x: 0, y: 0 });
  const [completeGame, setCompleteGame] = useState([]);

  const imageRef = useRef(null);

  function handleClick(e, ref, characters) {
    const rect = ref.current.getBoundingClientRect(); 
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
  
    setPixel({ x, y });

    for ( let chars of characters) {
      if(Math.abs(x - chars.xpixel) <= chars.tolerance && Math.abs(y - chars.ypixel) <= chars.tolerance) {
        alert(`you get it! ${chars.name}`);
        if (!completeGame.includes(chars.name)) {
          setCompleteGame(prev => [...prev, chars.name]);
        }        
      } else{
        console.log("continue!");
      }
    }  
  }
  
  return (
    <>
     {!characters || !image && <p>Missing game data. Go back and select a scene.</p>}
     <Stopwatch characters={completeGame}/>
     <p>Clicked at: X = {pixel.x.toFixed(2)}, Y = {pixel.y.toFixed(2)}</p>
      <img
        ref={imageRef}
        src={image}
        alt="hide and seek illustration"
        onClick={(e) => (handleClick(e, imageRef, characters))} 
        style={{ width: '100%', maxWidth: '1000px' }} 
      />
    </>
  );
}

export default Game;