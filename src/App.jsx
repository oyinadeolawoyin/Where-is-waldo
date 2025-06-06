import { useCharacters } from "./components/game/charactersContext";
import { useNavigate, Link } from "react-router-dom";

import birthday from "./assets/birthday.jpeg";
import food from "./assets/food.jpeg";
import movie from "./assets/movie.jpeg";
import styles from './App.module.css';

function App() {
  const { birthdayCharacters, foodCharacters, movieCharacters, error, loading } = useCharacters();
  const navigate = useNavigate();

  function handleStartGame(sceneCharacters, image) {
    navigate("/game", { state: { characters: sceneCharacters, image } });
  }

  return(
    <div className={styles.body}>
      <header>
        <h1>Where's&nbsp;<span>Wally?</span></h1>
        <button><Link to="leader board" className={styles.link}>Leader Board</Link></button>
      </header>
      <main>
        {error && <p>{error}</p>}
        {loading ? 
          (
            <div>Loading.... please wait for few minutes.</div>
          ):(
            <div>
              <h2>Choose your favourite scene!</h2>
              <section>
                <div>
                  <img src={birthday} alt="hid and seek illustration" />
                  <p>A birthday scene</p>
                  <button onClick={() => handleStartGame(birthdayCharacters, birthday)}>Start game</button>
                </div>
                <div>
                  <img src={food} alt="hid and seek illustration" />
                  <p>A carteen scene</p>
                  <button onClick={() => handleStartGame(foodCharacters, food)}>Start game</button>
                </div>
                <div>
                  <img src={movie} alt="hid and seek illustration" />
                  <p>A show scene</p>
                  <button onClick={() => handleStartGame(movieCharacters, movie)}>Start game</button>
                </div>
              </section>
            </div>
        )}
      </main>
    </div>
  )
}

export default App;