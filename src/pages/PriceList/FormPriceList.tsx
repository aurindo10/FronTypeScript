// import { Modal } from "./style";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useContext, useEffect, useState } from 'react';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { ContacaoContext } from '../../../src/pages/Cotacoes/CotacaoContext'
import { NumericFormat } from 'react-number-format';
import { priceFormatter } from '../../Utils/Formatter';
import { number } from 'zod';



export type Inputs = {
    
    productName: string,
    produto_id: string,
    unidade: string,
    valorUnitario?: number,
    quantidadeMínima?: number,
    quantidade?: number,  
};

// const productSchema = zod.object({
//     valorUnitario: zod.string().min(1, 'Informe o valor unitario'),
//     quantidadeMínima:zod.string().min(1, 'Informe a quantidade minima'),
// })

export  function FormPriceList (props:Inputs) {


  const {cotacaoState, dispatch} = useContext(ContacaoContext)


  const { control, handleSubmit, reset, watch, formState: { errors }, setValue, getValues} = useForm<Inputs>({
    // resolver: zodResolver(productSchema)
    defaultValues: {
        productName: props.productName,
        produto_id: props.produto_id,
        unidade: props.unidade,
        valorUnitario: props.valorUnitario,
        quantidadeMínima: props.quantidadeMínima,
        quantidade: props.quantidade
      }
  });

useEffect(()=>{
    setValue("productName", props.productName)
    setValue("produto_id", props.produto_id)
    setValue("quantidadeMínima",props.quantidadeMínima )
    setValue('unidade',props.unidade)
    setValue("quantidade", props.quantidade)
    setValue("valorUnitario",props.valorUnitario)
})



  const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {
    dispatch({type:'UPDATE_PRODUCT_PRICE_LIST', payload: data})
    console.log(data)
}
 
  return (
    <Box
    component="span"
    sx={{ padding: '40px', paddingLeft: '15px', }}> 
      <form style={{flexGrow: 1}} onChange={handleSubmit(onSubmit)} >
      <div>
        <Box sx={{display: "flex", alignItems: "center" }}>

        <Controller
            name="productName"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            label={'Nome do Produto'}
            placeholder = {"Nome do Produto"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
            name="quantidade"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            label={'Quantidade'}
            placeholder = {"Quantidade"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
            name="unidade"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            label={'Unidade'}
            placeholder = {"Unidade"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
            name="valorUnitario"
            control={control}
            render ={({field: {onChange, name, value}}) =><NumericFormat
            name = {name}
            onValueChange={(values) => {
                const {formattedValue, value, floatValue} = values;
                onChange(floatValue)
              }}
            customInput = {TextField}
            required
            value={props.valorUnitario}
            displayType="input"
            prefix="R$ "
            thousandSeparator="."
            decimalScale={2}
            decimalSeparator=","
            label={'Valor Unitário'}
            placeholder = {"Valor unitario"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
            name="quantidadeMínima"
            control={control}
            render={({field: {onChange, name, value}}) =><NumericFormat
            required
            customInput = {TextField}
            onValueChange={(values) => {
                const {formattedValue, value, floatValue} = values;
                onChange(floatValue)
              }}
            value = {props.quantidadeMínima}
            thousandSeparator="."
            decimalSeparator=","
            label={'Quantidade Mínima'}
            placeholder = {"QTD Mínima"}
            sx={{paddingRight: '15px'}}
            />}/>
        </Box>

        
    </div>
    </form>
    
    </Box>
    )
}
