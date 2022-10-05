import { reducerCotacao } from "./EditScreenCotacao/reducer"
import { useReducer, ReactNode, createContext } from "react"
import { state } from '../Cotacoes/EditScreenCotacao/reducer'




export const ContacaoContext = createContext([{}] as any)

interface CyclesContextProviderProps {
    children: ReactNode
  }
export function CyclesContextProvider({
    children,
  }: CyclesContextProviderProps) {
    const [cotacaoState, dispatch] = useReducer(reducerCotacao, {
        cotacao: [],
        productsOfCotacao: []
      } )

      return (
        <ContacaoContext.Provider
        value={{cotacaoState, dispatch}}
        >
            {children}
        </ContacaoContext.Provider>
      )

  }