import { useContext, createContext, useState, useEffect } from "react";

const CharactersContext = createContext();

export function CharactersProvider({ children }) {
    const [ birthdayCharacters, setBirthdayCharacters ] = useState([]);
    const [ foodCharacters, setFoodCharacters ] = useState([]);
    const [ movieCharacters, setMovieCharacters ] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchCharacters() {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(`https://waldo-server-wx8s.onrender.com/api/characters`, {
                    method: "GET",
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || "Something is wrong. Try again!");
                    console.log(data.message);
                    return;
                }
                
                setBirthdayCharacters(data.characters.filter(char => char.type === "birthday"));
                setFoodCharacters(data.characters.filter(char => char.type === "food"));
                setMovieCharacters(data.characters.filter(char => char.type === "movie"));


            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCharacters();
    }, []);


    return (
        <CharactersContext.Provider value={{ birthdayCharacters, foodCharacters, movieCharacters, error, loading }}>
            {children}
        </CharactersContext.Provider>
    )
}

export function useCharacters() {
    return useContext(CharactersContext);
}