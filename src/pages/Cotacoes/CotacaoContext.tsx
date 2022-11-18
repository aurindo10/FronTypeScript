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

  interface BuyList {
    idCotacao:'',
    _id: string,
    listas: [{
            nomeDoVendedor: string,
            empresa: string,
            ProductListToBuy: [
                {   
                    _id: string,
                    productName: string,
                    marca: string,
                    unidade: string,
                    quantidade: number,
                    valorUnitario: number,
                    quantidadeMinima: number
                }]
            }]
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
      const [onListToBuy, setonListToBuy] = useState<BuyList>({
        idCotacao:'',
        _id: '',
        listas: [{
                nomeDoVendedor: "",
                empresa: "",
                ProductListToBuy: [               
                     {
                    _id: "",
                    productName: "",
                    marca: '',
                    unidade:"" ,
                    quantidade: 0,
                    valorUnitario: 0,
                    quantidadeMinima:0
                     }
                 ]
                }]
            })
            
  const [next, setNext] = useState()
  const navigate = useNavigate();
  const [auth2, setAuth2] = useState({});

 
      return (
        <ContacaoContext.Provider
        value={{cotacaoState, dispatch, next, setNext, auth2, setAuth2, onListToBuy, setonListToBuy }}
        >
            {children}
        </ContacaoContext.Provider>
      )

  }