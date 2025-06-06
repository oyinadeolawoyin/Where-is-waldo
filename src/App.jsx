import { useCharacters } from "./components/game/charactersContext";
import { useNavigate, Link } from "react-router-dom";

import birthday from "./assets/birthday.jpeg";
import food from "./assets/food.jpeg";
import movie from "./assets/movie.jpeg"

function App() {
  const { birthdayCharacters, foodCharacters, movieCharacters, error, loading } = useCharacters();
  const navigate = useNavigate();

  function handleStartGame(sceneCharacters, image) {
    navigate("/game", { state: { characters: sceneCharacters, image } });
  }

  return(
    <>
      <header>
        <h1>Welcome to where's waldo!</h1>
        <p>Choose your favourite scene!</p>
        <button><Link to="leader board">Leader Board</Link></button>
      </header>
      <main>
        {error && <p>{error}</p>}
        {loading && <p>Loading.... please wait for few minutes.</p>}
        <section>
          <div>
            <img src={birthday} alt="hid and seek illustration" />
            <p>A birthday scene</p>
            <button onClick={() => handleStartGame(birthdayCharacters, birthday)}>Start game</button>
          </div>
          <div>
            <img src={food} alt="hid and seek illustration" />
            <p>A catery scene</p>
            <button onClick={() => handleStartGame(foodCharacters, food)}>Start game</button>
          </div>
          <div>
            <img src={movie} alt="hid and seek illustration" />
            <p>A show scene</p>
            <button onClick={() => handleStartGame(movieCharacters, movie)}>Start game</button>
          </div>
        </section>
      </main>
    </>
  )
}

export default App;