// import { Modal } from "./style";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext, useState } from 'react';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import { ContacaoContext } from '../../../src/pages/Cotacoes/CotacaoContext'
import { useLocation } from 'react-router-dom';
import { createProxyProxy } from 'immer/dist/internal';

export type Inputs = {
    
    productName: string,
    produto_id: string,
    unidade: string,
    valorUnitario?: string,
    quantidadeMínima?: number
    quantidade?: number,  
};

const productSchema = zod.object({
    productName: zod.string().min(1, 'Informe o nome do produto'),
    produto_id: zod.string().min(1, ''),
    unidade:zod.string().min(1, ''),
    valorUnitario: zod.string().min(1, 'Informe o valor unitario'),
    quantidadeMínima:zod.string().min(1, 'Informe a quantidade minima'),
    quantidade:zod.string().min(1, ''),
})

export  function FormPriceList (props:Inputs) {
  const location = useLocation()
  const {cotacaoState, dispatch} = useContext(ContacaoContext)
  const { priceList } = cotacaoState

  const { control, handleSubmit, reset, watch, formState: { errors }, setValue, getValues} = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
        productName: props.productName,
        produto_id: props.produto_id,
        unidade: props.unidade,
        valorUnitario: props.valorUnitario,
        quantidadeMínima: props.quantidadeMínima,
        quantidade:props.quantidade,
    }
  });


  setValue("productName", props.productName)
  setValue("produto_id", props.produto_id)
  setValue("unidade",props.unidade)
  setValue("quantidade", props.quantidade)




  const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {
      dispatch({type:'UPDATE_PRODUCT_PRICE_LIST', payload: data})
      console.log(priceList)
    }
    
  return (
    <Box
    component="span"
    sx={{ padding: '40px', paddingLeft: '15px', }}> 
      <form style={{flexGrow: 1}} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Box sx={{display: "flex", alignItems: "center" }}>

        <Controller
            name="productName"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            placeholder = {"Nome do Produto"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
            name="quantidade"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            placeholder = {"Quantidade"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
            name="unidade"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            placeholder = {"Unidade"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
            name="valorUnitario"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            placeholder = {"Valor unitario"}
            sx={{paddingRight: '15px'}}
            />}/>        
        <Controller
            name="quantidadeMínima"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            placeholder = {"QTD Mínima"}
            sx={{paddingRight: '15px'}}
            />}/>

      <Button 
            
            type="submit"
            variant="contained"
            sx={{ width: '100px', left: "1.5rem", height: "3.2rem" }}
          > Salvar 
          </Button>
        </Box>
        
    </div>
    </form>
    
    </Box>
    )
}






  
function dispatch(arg0: { type: string; payload: Inputs; }) {
    throw new Error('Function not implemented.');
}

