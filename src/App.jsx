import { useState, useRef } from 'react';
import { useCharacters } from './charactersContext';
import Stopwatch from './timer';
import birthday from "./assets/birthday.jpeg";
import food from "./assets/food.jpeg";
import movie from "./assets/movie.jpeg";

function App() {
  const [pixel, setPixel] = useState({ x: 0, y: 0 });
  const [completeGame, setCompleteGame] = useState([]);
  const { birthdayCharacters, foodCharacters, movieCharacters } = useCharacters();
  const birthdayRef = useRef(null);
  const foodRef = useRef(null);
  const movieRef = useRef(null);

  function handleClick(e, ref, characters) {
    const rect = ref.current.getBoundingClientRect(); 
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
  
    setPixel({ x, y });

    for ( let chars of characters) {
      // console.log("chars", chars, "x", chars.x, "y", chars.y);
      if(Math.abs(pixel.x - chars.x) <= chars.tolerance && Math.abs(pixel.y - chars.y) <= chars.tolerance) {
        alert(`you get it! ${chars.name}`);
        if (!completeGame.includes(chars.name)) {
          setCompleteGame(prev => [...prev, chars.name]);
        }        
      } else{
        console.log("continue!");
      }
    }

    console.log(`Clicked at % X: ${x.toFixed(2)}, Y: ${y.toFixed(2)};`);
    
  }

  return (
    <>
     <Stopwatch characters={completeGame}/>
     <p>Clicked at: X = {pixel.x.toFixed(2)}, Y = {pixel.y.toFixed(2)}</p>
      <img
        ref={birthdayRef}
        src={birthday}
        alt="hide and seek illustration"
        onClick={(e) => (handleClick(e, birthdayRef, birthdayCharacters))} 
        style={{ width: '100%', maxWidth: '1000px' }} 
      />
      <img
        ref={foodRef}
        src={food}
        alt="hide and seek illustration"
        onClick={(e) => (handleClick(e, foodRef, foodCharacters))} 
        style={{ width: '100%', maxWidth: '1000px' }} 
      />
      <img
        ref={movieRef}
        src={movie}
        alt="hide and seek illustration"
        onClick={(e) => (handleClick(e, movieRef, movieCharacters))} 
        style={{ width: '100%', maxWidth: '1000px' }} 
      />
    </>
  );
}

export default App;