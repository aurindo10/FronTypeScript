// import { Modal } from "./style";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { ContacaoContext } from '../../../src/pages/Cotacoes/CotacaoContext'
import { NumericFormat } from 'react-number-format';
import { Button, Divider, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { ProducName } from './style';



export type Inputs = {
    productName: string,
    product_id: string,
    marca: string,
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
  const { priceList } = cotacaoState

  const { control, handleSubmit, reset, watch, formState: { errors }, setValue, getValues} = useForm<Inputs>({
    // resolver: zodResolver(productSchema)
    defaultValues: {
        productName: props.productName,
        product_id: props.product_id,
        marca: props.marca,
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
    setValue("marca", props.marca)
    setValue("quantidadeMinima",props.quantidadeMinima )
    setValue('unidade',props.unidade)
    setValue("quantidade", props.quantidade)
    setValue("valorUnitario",props.valorUnitario)
    setValue("vendedorId", props.vendedorId)
})



  const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {
    dispatch({type:'UPDATE_PRODUCT_PRICE_LIST', payload: data})
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

      <Stack 
      onChange={handleSubmit(onSubmit)} 
      component="form"
      sx={{
        width: '100%',
        height: '100%'
      }}
      spacing={2}
      alignItems="center"
  
      >
        <ProducName>
            <div><span>Produto:</span>{getValues("productName")}</div>
            {/* <div>{getValues("marca")}</div>
            <div>{getValues("quantidade")+getValues("unidade")}</div> */}
        </ProducName>
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
            sx={{}}
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
            variant={"standard"}
            sx={{}}
            />}/>
            {cotacaoState.activeStep===cotacaoState.priceList.length - 1 &&<Button onClick={HandleClick} sx={{}}>Enviar</Button>
            }
    </Stack>
    
    )
}
