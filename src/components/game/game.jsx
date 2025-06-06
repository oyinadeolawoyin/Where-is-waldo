import { useState, useRef } from 'react';
import { useLocation, Link } from "react-router-dom";
import Stopwatch from './timer';
import styles from "./game.module.css";

function Game() {
  const location = useLocation();
  const { characters, image } = location.state || {};
  const [completeGame, setCompleteGame] = useState([]);
  const [character, setCharacter] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });

  const imageRef = useRef(null);

  function handleClick(e, ref) {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setDropdownPosition({ x: e.clientX - rect.left, y:e.clientY - rect.top });
    setDropdownVisible(true);
    setCharacter({ x, y });
  }

  const handleChange = (e) => {
    const selected = e.target.value;
    setDropdownVisible(false); 

    for (let chars of characters) {
      if (
        Math.abs(character.x - chars.xpixel) <= chars.tolerance &&
        Math.abs(character.y - chars.ypixel) <= chars.tolerance
      ) {
        if (chars.name.toLowerCase() === selected.toLowerCase()) {
          if (!completeGame.includes(chars.name)) {
            setCompleteGame(prev => [...prev, chars.name]);
          }
          return;
        } else {
          return;
        }
      }
    }
  };

  return (
    <div className={styles.body}>
      <header>
        <h1><Link to="/" className={styles.link}>Where's&nbsp;<span>Wally?</span></Link></h1>
        {!characters || !image && <p>Missing game data. Go back and select a scene.</p>}
        <Stopwatch characters={completeGame} />
      </header>

      <div>
        <p>Milo, Luna, and Ziggy are having fun with their friends. <br />
           But their moms are calling them home!<br />
           Can you spot them in time?
        </p>
        <p><b>Correct picks turn the red bar blue. Good luck!</b></p>
        <div className={styles.checked}>
            {["Luna", "Milo", "Ziggy"].map((name) => (
              <ul key={name} className={styles.list}>
                <li
                  className={`${styles.checklist} ${completeGame.includes(name) ? styles.found : ''}`}
                ></li>
                <li>{name}</li>
              </ul>
            ))}
        </div>
      </div>

      <main style={{ position: "relative" }}>
        {dropdownVisible && (
          <Dropdown
            handleChange={handleChange}
            position={dropdownPosition}
          />
        )}
        <img
          ref={imageRef}
          src={image}
          alt="hide and seek illustration"
          onClick={(e) => handleClick(e, imageRef)}
        />
      </main>
    </div>
  );
}


function Dropdown({ handleChange, position }) {
  const options = ["milo", "luna", "ziggy"];

  return (
    <ul
      style={{
        position: "absolute",
        top: position.y,
        left: position.x, 
      }}

      className={styles.dropdown}
    >
      <p>Choose a character:</p>
      {options.map((option) => (
        <li
          key={option}
          onClick={() => handleChange({ target: { value: option } })}
          style={{
            padding: "4px 8px",
            cursor: "pointer",
            borderBottom: "1px solid #ccc",
          }}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </li>
      ))}
    </ul>
  );
}


export default Game;