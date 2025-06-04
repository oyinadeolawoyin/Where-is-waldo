import { useContext, createContext, useState } from "react";

const CharactersContext = createContext();

export function CharactersProvider({ children }) {
    const [ birthdayCharacters, setBirthdayCharacters ] = useState([
        {
            "name": "Luna",
            "x": 55.21,
            "y": 80.62,
            "tolerance": 7.0
        },
        {
            "name": "Milo",
            "x": 7.55,
            "y": 24.11,
            "tolerance": 7.0
        },
        {
            "name": "Ziggy",
            "x": 66.15,
            "y": 52.24,
            "tolerance": 7.0
        }
    ]);

    const [ foodCharacters, setFoodCharacters ] = useState([ 
        {
            "name": "Luna",
            "x": 93.23,
            "y": 67.53,
            "tolerance": 7.0
        },
        {
            "name": "Milo",
            "x": 83.67,
            "y": 26.27,
            "tolerance": 7.0
        },
        {
            "name": "Ziggy",
            "x": 40.63,
            "y": 86.27,
            "tolerance": 7.0
        },
    ]);

    const [ movieCharacters, setMovieCharacters ] = useState([ 
        {
            "name": "Luna",
            "x": 5.21,
            "y": 63.66,
            "tolerance": 7.0
        },
        {
            "name": "Milo",
            "x": 63.54,
            "y": 42.83,
            "tolerance": 7.0
        },
        {
            "name": "Ziggy",
            "x": 29.43,
            "y": 88.14,
            "tolerance": 7.0
        }
    ]);



    return (
        <CharactersContext.Provider value={{ birthdayCharacters, foodCharacters, movieCharacters }}>
            {children}
        </CharactersContext.Provider>
    )
}

export function useCharacters() {
    return useContext(CharactersContext);
}