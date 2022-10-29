import { Navigate, Route, RouteProps, Routes, useNavigate } from 'react-router-dom'
import { HomeComponent } from './pages/Home/Home'
import { DefaultLayout } from './DefaultLayout/defaultLayout'
import { Cadastro } from './pages/cadastro/Cadastro'
import { Cotacoes } from './pages/Cotacoes/Cotacoes'
import { EditPageCotacao } from './pages/Cotacoes/EditScreenCotacao/EditPageCotacao'
import { EntryPage } from './pages/PriceList/EntryPage'
import { PriceList } from './pages/PriceList/PriceList'
import { BuyList } from './pages/BuyList/BuyList'
import { PriceListByIdCotation } from './pages/Cotacoes/cotacoesList/PriceListPage'
import { OneBuyList } from './pages/BuyList/OneBuyList'
import { RegistorDeUsuario } from './pages/Loggin/Register'
import { Login } from './pages/Loggin/Login'
import { RequireAuth } from './RequireAuth'
import { SucessPage } from './pages/PriceList/SucessPage'
import { PersistLogin } from './Utils/PersistLogin'



export function Router() {
  
  return (
    
      <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/register" element={<RegistorDeUsuario />} />
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth/>}>
                <Route path="/" element={<DefaultLayout />}>
                    <Route  path="/home" element={<HomeComponent />} />
                    <Route  path="/cadastro" element={<Cadastro />} />
                    <Route  path="/cotacoes" element={<Cotacoes />} />
                    <Route  path="/cotacoes/edit/:idList" element={<EditPageCotacao/>} />
                    <Route  path="/buylist/onebuylist/:idbuylist" element={<OneBuyList />}/>
                    <Route  path="/buylist" element = {<BuyList/>}/>
                    <Route  path="/pricelistbyidcotation/:idPriceList" element = {<PriceListByIdCotation/>}/>
                </Route>
            </Route>
          </Route>
          <Route path='/pricelist/:id/' element={<EntryPage/>}></Route>
          <Route path='/pricelist/:id/:name/:empresa/:sellerid' element={<PriceList/>}></Route>
          <Route path='/sucesssent' element={<SucessPage/>}/>
      </Routes> 
    
  )
}
