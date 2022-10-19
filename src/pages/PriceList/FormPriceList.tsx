// import { Modal } from "./style";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { ContacaoContext } from '../../../src/pages/Cotacoes/CotacaoContext'
import { NumericFormat } from 'react-number-format';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';


export type Inputs = {
    
    productName: string,
    product_id: string,
    unidade: string,
    valorUnitario?: number,
    quantidadeMinima?: number,
    quantidade?: number,  
    vendedorId: string
};

// const productSchema = zod.object({
//     valorUnitario: zod.string().min(1, 'Informe o valor unitario'),
//     quantidadeMínima:zod.string().min(1, 'Informe a quantidade minima'),
// })

export  function FormPriceList (props:Inputs) {
  const {id, name, empresa, sellerid} = useParams()

  const {cotacaoState, dispatch} = useContext(ContacaoContext)


  const { control, handleSubmit, reset, watch, formState: { errors }, setValue, getValues} = useForm<Inputs>({
    // resolver: zodResolver(productSchema)
    defaultValues: {
        productName: props.productName,
        product_id: props.product_id,
        unidade: props.unidade,
        valorUnitario: props.valorUnitario,
        quantidadeMinima: props.quantidadeMinima,
        quantidade: props.quantidade,
        vendedorId: props.vendedorId
      }
  });

useEffect(()=>{
    setValue("productName", props.productName)
    setValue("product_id", props.product_id)
    setValue("quantidadeMinima",props.quantidadeMinima )
    setValue('unidade',props.unidade)
    setValue("quantidade", props.quantidade)
    setValue("valorUnitario",props.valorUnitario)
    setValue("vendedorId", props.vendedorId)
})



  const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {
    dispatch({type:'UPDATE_PRODUCT_PRICE_LIST', payload: data})
    console.log(data)
}
  function HandleClick () {
    const ProdutoNaoPreenchidos = cotacaoState.priceList.filter((e: any)=>{return (
        e.valorUnitario == '')
      })
      console.log(ProdutoNaoPreenchidos)
      console.log(cotacaoState.priceList[0].valorUnitario)
      if (ProdutoNaoPreenchidos) {
        fetch("http://localhost:3002/cotacoes/cadastrodelistadeprecos", {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({
          vendedor: name,
          empresa: empresa,
          cotacao_id: id,
          listOfProducts: cotacaoState.priceList
        })}).then(response => response.json())
      }
      console.log("preencha tudo")
  } 
 
  return (
      <form style={{textAlign: 'center'}} onChange={handleSubmit(onSubmit)} >
        <Controller
            name="productName"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            label={'Nome do Produto'}
            placeholder = {"Nome do Produto"}
            sx={{paddingRight: '15px',marginTop: '32px'}}
            />}/>
        <Controller
            name="quantidade"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            label={'Quantidade'}
            placeholder = {"Quantidade"}
            sx={{paddingRight: '15px',marginTop: '32px'}}
            />}/>
        <Controller
            name="unidade"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            label={'Unidade'}
            placeholder = {"Unidade"}
            sx={{paddingRight: '15px',marginTop: '32px'}}
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
            sx={{paddingRight: '15px',marginTop: '32px'}}
            />}/>
        <Controller
            name="quantidadeMinima"
            control={control}
            render={({field: {onChange, name, value}}) =><NumericFormat
            required
            customInput = {TextField}
            onValueChange={(values) => {
                const {formattedValue, value, floatValue} = values;
                onChange(floatValue)
              }}
            value = {props.quantidadeMinima}
            thousandSeparator="."
            decimalSeparator=","
            label={'Quantidade Mínima'}
            placeholder = {"QTD Mínima"}
            sx={{paddingRight: '15px',marginTop: '32px'}}
            />}/>
            <Button onClick={HandleClick} sx={{display: 'block',paddingTop: '15px', flexDirection: 'column', verticalAlign: 'top', position: "relative"}}>Enviar</Button>
    </form>
    
    )
}
