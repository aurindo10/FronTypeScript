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
import { axiosFree } from "../../lib/axios"
import { useNavigate } from 'react-router-dom';
import { MyCustomNumberFormat } from './Currency';
import { 
  CurrencyInput, 
  Currencies, 
  Locales 
} from 'input-currency-react';



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
  const navigate = useNavigate()

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
  const HandleClick = async ()=> {
    const ProdutoNaoPreenchidos = cotacaoState.priceList.filter((e: any)=>{return (
        e.valorUnitario == '')
      })
      if (ProdutoNaoPreenchidos) {
        try {
        const response = await axiosFree.post("cotacoes/cadastrodelistadeprecos", 
          JSON.stringify({
          vendedor: name,
          empresa: empresa,
          cotacao_id: id,
          listOfProducts: cotacaoState.priceList
        }
        ),
        )
        if (response.status === 200) {
          navigate("/sucesssent")}
      }catch(err){console.log(err)}
      }
  } 

  console.log(getValues("valorUnitario"))

  function dslkslds (_: any, maskedValue: any, floatValue: any) {
    useEffect(()=>{

      setValue("valorUnitario", floatValue)

    },[floatValue])
  }





  return (

      <Stack 
      onChange={handleSubmit(onSubmit)} 
      component="form"
      sx={{
        width: '100%',
        height: '100%',
        
      }}
      spacing={1}
      alignItems="center"
  
      >
        <ProducName>
            <Box className='produto'>PRODUTO:</Box>
            <Box sx={{height: '8.4rem'}}>
              <Box>
                  <Box className='productName'>{cotacaoState.priceList[cotacaoState.activeStep].productName}</Box>
                  <Box className='quantidade'> {cotacaoState.priceList[cotacaoState.activeStep].quantidade}{'  '}{cotacaoState.priceList[cotacaoState.activeStep].unidade}</Box>
              </Box>
              <Box>
                  <Box className='marca  '>Marca:</Box >
                  <Box className='marcaName'> {cotacaoState.priceList[cotacaoState.activeStep].marca}</Box>
              </Box>
            </Box>
            
        </ProducName>
        <Box sx={{backgroundColor: 'white', borderRadius: '5px'}}>
          <Controller
          name="valorUnitario"
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          })=> (
            <MyCustomNumberFormat

            onValueChange={(values: any) => {
              const {formattedValue, value, floatValue} = values;
              console.log(floatValue/100)
              onChange(floatValue/100)
            }}
            value={props.valorUnitario!*100}
            label={`Valor por ${cotacaoState.priceList[cotacaoState.activeStep].unidade}`}
            defaultValue={0}
  
            
            />
          )}
          />
          </Box>
          <Box sx={{backgroundColor: 'white', borderRadius: '5px'}}>
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
              sx={{ '& label.Mui-focused':{
                color: 'black'
              },
              '& .MuiInputBase-input': {
          
                position: 'relative',
                color: '#1B1B1B',
                width: '14rem',
                height: '3rem',
                padding: '1px 1px',
                fontSize: '25px',
                fontFamily: [
                  'Montserrat'
                ]
              },
            
            }}
            inputProps={{ inputMode: 'numeric' }}

              />}/>
            </Box>
            <Box sx={{height: '3rem'}}>
            {cotacaoState.activeStep===cotacaoState.priceList.length - 1 &&<Button onClick={HandleClick} sx={{
              backgroundColor:'#FF7A00'
              , color: 'white',
            fontFamily: "'Montserrat' ",
            fontWeight: "900px",
            borderWidth: "1px" ,
            borderColor: "#FFFFFF",
            fontSize: '1.3rem',
            borderStyle: "solid",
            borderRadius: "25px",
            textAlign: 'center',
            // borderRadius: "12px 12px 12px 12px",
            }}>Enviar</Button>
            }
            </Box>
    </Stack>
    
    )
}
