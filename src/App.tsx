import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import * as React from 'react';
import { createContext } from 'react'
import { CyclesContextProvider } from './pages/Cotacoes/CotacaoContext';

const productsContext = createContext ({})


function App() {
  

  return (
    
      <BrowserRouter>
      <CyclesContextProvider>
        <Router />
        </CyclesContextProvider>
      </BrowserRouter>
    
  )
}

export default App
