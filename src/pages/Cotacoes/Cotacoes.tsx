import React from 'react'
import { CotacoesContainer} from "./style"
import { CotacaoRegister } from '../Cotacoes/cotacaoRegister/CotacaoRegister'
import { CotacaoList } from './cotacoesList/CotacaoList'











export function Cotacoes () {

    return (
            <CotacoesContainer>
                <CotacaoRegister></CotacaoRegister>
                <CotacaoList></CotacaoList>
            </CotacoesContainer>
)
}