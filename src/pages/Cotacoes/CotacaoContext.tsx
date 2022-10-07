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
        priceList:[{name:'',
          unidade: '',
          quantidade: '',
          _id: '',
          valorUnitario: '',
          quantidadeMínima: ''}],
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