import React from 'react'
import { CadastroContainer } from './style'
import { BasicTable } from '../../components/Bar/register/ProductsTable'
import { createContext, useState } from 'react'
import { data } from '../../components/Bar/register/ProductsTable'
import DialogDemo from '../../components/Bar/register/ProductRegister2'



export const productsContext = createContext([{}] as any)



export function Cadastro (){
    const [productList, setProductList] = useState([{_id:''}])
    return (
        <productsContext.Provider value={{productList, setProductList}}>
            <CadastroContainer>
                    <DialogDemo></DialogDemo>
                    <BasicTable></BasicTable>
            </CadastroContainer>
        </productsContext.Provider>
    )
}