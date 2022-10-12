import { reducerCotacao } from "./EditScreenCotacao/reducer"
import { useReducer, ReactNode, createContext, useState } from "react"
import { notNullish } from "react-select/dist/declarations/src/utils"



export const ContacaoContext = createContext([{}] as any)

interface CyclesContextProviderProps {
    children: ReactNode
  }
export function CyclesContextProvider({
    children,
  }: CyclesContextProviderProps) {
    const [cotacaoState, dispatch] = useReducer(reducerCotacao, {
        cotacao: [],
        productsOfCotacao: [],
        priceList:[{
          productName:'',
          product_id: '',
          unidade: '',
          valorUnitario: 0,
          quantidadeMinima:0,
          quantidade: 0,
}],
          activeStep: 0
      })
  const [next, setNext] = useState()
      return (
        <ContacaoContext.Provider
        value={{cotacaoState, dispatch, next, setNext}}
        >
            {children}
        </ContacaoContext.Provider>
      )

  }