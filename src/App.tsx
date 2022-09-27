import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import * as React from 'react';
import { createContext } from 'react'

const productsContext = createContext ({})


function App() {
  

  return (
      
      <BrowserRouter>
        <Router />
      </BrowserRouter>
  )
}

export default App
