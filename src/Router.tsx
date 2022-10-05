import { Route, Routes } from 'react-router-dom'
import { HomeComponent } from './pages/Home/Home'
import { DefaultLayout } from './DefaultLayout/defaultLayout'
import { Cadastro } from './pages/cadastro/Cadastro'
import { Cotacoes } from './pages/Cotacoes/Cotacoes'
import { EditPageCotacao } from './pages/Cotacoes/EditScreenCotacao/EditPageCotacao'
import { CyclesContextProvider } from './pages/Cotacoes/CotacaoContext' 







export function Router() {
  
  return (
    <CyclesContextProvider>
      <Routes>
          
          <Route path="/" element={<DefaultLayout />}>
          
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/cotacoes" element={<Cotacoes />} />
            <Route path="/cotacoes/edit" element={<EditPageCotacao state={''}/>} />

          </Route>
          
      </Routes>
    </CyclesContextProvider>
  )
}
