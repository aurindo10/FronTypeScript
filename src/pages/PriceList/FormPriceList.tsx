// import { Modal } from "./style";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext, useEffect, useState } from 'react';
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
    valorUnitario?: number,
    quantidadeMínima?: number
    quantidade?: number,  
};

const productSchema = zod.object({
   

    valorUnitario: zod.number().min(1, 'Informe o valor unitario'),
    quantidadeMínima:zod.number().min(1, 'Informe a quantidade minima'),

})

export  function FormPriceList (props:Inputs) {

  const location = useLocation()
  const {cotacaoState, dispatch} = useContext(ContacaoContext)


  const { control, handleSubmit, reset, watch, formState: { errors }, setValue, getValues} = useForm<Inputs>({
  });


  setValue("productName", props.productName)
  setValue("produto_id", props.produto_id)
  setValue("quantidadeMínima",props.quantidadeMínima )
  setValue('unidade',props.unidade)
  setValue("quantidade", props.quantidade)
  setValue("valorUnitario",props.valorUnitario)

  const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {
    dispatch({type:'UPDATE_PRODUCT_PRICE_LIST', payload: data})
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
            render={({ field }) =><TextField
            {...field}
            required
            label={'Valor Unitário'}
            placeholder = {"Valor unitario"}
            sx={{paddingRight: '15px'}}
            />}/>        
        <Controller
            name="quantidadeMínima"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
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
