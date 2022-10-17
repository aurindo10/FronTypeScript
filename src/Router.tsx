import { Navigate, Route, RouteProps, Routes, useNavigate } from 'react-router-dom'
import { HomeComponent } from './pages/Home/Home'
import { DefaultLayout } from './DefaultLayout/defaultLayout'
import { Cadastro } from './pages/cadastro/Cadastro'
import { Cotacoes } from './pages/Cotacoes/Cotacoes'
import { EditPageCotacao } from './pages/Cotacoes/EditScreenCotacao/EditPageCotacao'
import { ContacaoContext } from './pages/Cotacoes/CotacaoContext' 
import { EntryPage } from './pages/PriceList/EntryPage'
import { PriceList } from './pages/PriceList/PriceList'
import { BuyList } from './pages/BuyList/BuyList'
import { PriceListByIdCotation } from './pages/Cotacoes/cotacoesList/PriceListPage'
import { OneBuyList } from './pages/BuyList/OneBuyList'
import { RegistorDeUsuario } from './pages/Loggin/Register'
import { Login } from './pages/Loggin/Login'
import { useContext } from 'react'
import { PrivateRoute } from './PrivateRoute'




export function Router() {
  
  return (
    
      <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/register" element={<RegistorDeUsuario />} />
          <Route path="/" element={<PrivateRoute><DefaultLayout /></PrivateRoute>}>
            <Route  path="/home" element={<PrivateRoute><HomeComponent /></PrivateRoute>} />
            <Route  path="/cadastro" element={<PrivateRoute><Cadastro /></PrivateRoute>} />
            <Route  path="/cotacoes" element={<PrivateRoute><Cotacoes /></PrivateRoute>} />
            <Route  path="/cotacoes/edit/:idList" element={<PrivateRoute><EditPageCotacao/></PrivateRoute>} />
            <Route  path="/buylist/onebuylist/:idbuylist" element={<PrivateRoute><OneBuyList /></PrivateRoute>}/>
            <Route  path="/buylist" element = {<PrivateRoute><BuyList/></PrivateRoute>}/>
            <Route  path="/pricelistbyidcotation/:idPriceList" element = {<PrivateRoute><PriceListByIdCotation/></PrivateRoute>}/>
          </Route>
          <Route path='/pricelist/:id/' element={<EntryPage/>}></Route>
          <Route path='/pricelist/:id/:name/:empresa/:sellerid' element={<PriceList/>}></Route>
      </Routes> 
    
  )
}
