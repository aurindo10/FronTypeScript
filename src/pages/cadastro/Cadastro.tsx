import React from 'react'
import { CadastroContainer } from './style'
import { BasicTable } from '../../components/Bar/register/ProductsTable'
import { FormPropsTextFields } from '../../components/Bar/register/ProductRegister'
import { createContext, useState } from 'react'
import { data } from '../../components/Bar/register/ProductsTable'



export const productsContext = createContext([{}] as any)



export function Cadastro (){
    const [productList, setProductList] = useState([{nome:''}])
    return (
        <productsContext.Provider value={{productList, setProductList}}>
            <CadastroContainer>
                    <FormPropsTextFields></FormPropsTextFields>
                    <BasicTable></BasicTable>
            </CadastroContainer>
        </productsContext.Provider>
    )
}