import { reducerCotacao } from "./EditScreenCotacao/reducer"
import { useReducer, ReactNode, createContext, useState, useEffect } from "react"
import { notNullish } from "react-select/dist/declarations/src/utils"
import { InputsLogin } from "../Loggin/Login"
import { useLocation, useNavigate } from "react-router-dom"
import axios from '../../lib/axios'



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
  const navigate = useNavigate();
  const [auth2, setAuth2] = useState({});

 
      return (
        <ContacaoContext.Provider
        value={{cotacaoState, dispatch, next, setNext, auth2, setAuth2 }}
        >
            {children}
        </ContacaoContext.Provider>
      )

  }