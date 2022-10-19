import { reducerCotacao } from "./EditScreenCotacao/reducer"
import { useReducer, ReactNode, createContext, useState, useEffect } from "react"
import { notNullish } from "react-select/dist/declarations/src/utils"
import { InputsLogin } from "../Loggin/Login"
import { useNavigate } from "react-router-dom"



export const ContacaoContext = createContext([{}] as any)

interface CyclesContextProviderProps {
    children: ReactNode
  }

export function CyclesContextProvider({
    children,
  }: CyclesContextProviderProps)
  {
    const [cotacaoState, dispatch] = useReducer(reducerCotacao, {
        cotacao: [],
        productsOfCotacao: [],
        priceList:[{
          productName:'',
          product_id: '',
          marca: '',
          unidade: '',
          valorUnitario: 0,
          quantidadeMinima:0,
          quantidade: 0,
          vendedorId: ''
}],
          activeStep: 0
      })
  const [next, setNext] = useState()
  const [auth, setAuth] = useState(false)
  const [token, setTonken] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const  HandleLogin = async (data: InputsLogin) =>{    
    await fetch("http://localhost:3002/user/login", {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(data)}).then(response => { return response.json()})
     .then((response)=>{setTonken(response)})
    .catch(error => console.error("Error:", error))
    setAuth(true)
    localStorage.setItem("token", JSON.stringify(token))
    navigate('/home')
  }
  const  HandleLogout = async (data: InputsLogin) =>{    
    await fetch("http://localhost:3002/user/login", {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(data)}).then(response => { return response.json()})
     .then((response)=>{setTonken(response)})
    .catch(error => console.error("Error:", error))
    setAuth(false)
    localStorage.removeItem("token")
    navigate('/login')
  }


  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (token) {
      setAuth(true)
    }
    setLoading(false)
  },[])


  if (loading) {
    return <h1>Carregando</h1>
  }

      return (
        <ContacaoContext.Provider
        value={{cotacaoState, dispatch, next, setNext, HandleLogin, auth, HandleLogout}}
        >
            {children}
        </ContacaoContext.Provider>
      )

  }