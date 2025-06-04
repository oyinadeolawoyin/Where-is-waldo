import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import { CharactersProvider } from './charactersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CharactersProvider>
      <App />
    </CharactersProvider>
  </StrictMode>,
)
