import React from 'react'
import { CotacoesContainer} from "./style"
import { CotacaoRegister } from '../Cotacoes/cotacaoRegister/CotacaoRegister'
import { CotacaoList } from './cotacoesList/CotacaoList'
import { createContext, useState } from 'react'





export const cotacaoListContext = createContext([{}] as any)



export function Cotacoes () {
    const [cotacaoList, setCotacaoList] = useState([{_id:''}])


    return (
  
            <CotacoesContainer>
                <CotacaoRegister></CotacaoRegister>
                <CotacaoList></CotacaoList>
            </CotacoesContainer>

)
}