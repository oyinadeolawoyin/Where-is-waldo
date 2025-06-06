import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Game from './components/game/game.jsx';
import Leaderboard from './components/leaderboard/leaderboard.jsx';
import User from './components/leaderboard/recordPage.jsx';


import { CharactersProvider } from './components/game/charactersContext.jsx';
import { RecordsProvider } from './components/leaderboard/recordsContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "game",
    element: <Game />,
  },
  {
    path: "record page",
    element: <User />

  },
  {
    path: "leader board",
    element: <Leaderboard />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CharactersProvider>
      <RecordsProvider>
        <RouterProvider router={router} />
      </RecordsProvider>
    </CharactersProvider>
  </StrictMode>,
)
