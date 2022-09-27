import { Route, Routes } from 'react-router-dom'
import { HomeComponent } from './pages/Home/Home'
import { DefaultLayout } from './DefaultLayout/defaultLayout'
import { Cadastro } from './pages/cadastro/Cadastro'







export function Router() {
  
  return (
    <Routes>
      
        <Route path="/" element={<DefaultLayout />}>
        
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/cadastro" element={<Cadastro />} />
         
        </Route>
      
    </Routes>
  )
}
