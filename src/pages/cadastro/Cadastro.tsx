import React from 'react'
import { CadastroContainer } from './style'
import { BasicTable } from '../../components/Bar/register/ProductsTable'
import { FormPropsTextFields } from '../../components/Bar/register/ProductRegister'
import { createContext, useState } from 'react'



export const productsContext = createContext([{}] as any)



export function Cadastro (){
    const [product, setProducts] = useState(0)
    return (
        <productsContext.Provider value={{product, setProducts}}>
            <CadastroContainer>
                
                    <FormPropsTextFields></FormPropsTextFields>
                    <BasicTable></BasicTable>
                
            </CadastroContainer>
        </productsContext.Provider>
    )
}