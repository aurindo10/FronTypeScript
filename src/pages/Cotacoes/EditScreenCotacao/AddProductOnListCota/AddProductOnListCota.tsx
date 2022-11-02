import { Modal } from "./style";
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
import { ContacaoContext } from '../../CotacaoContext'
import { useLocation } from 'react-router-dom';
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { getValue } from "@mui/system";

type Inputs = {
    _id: string,
    name: string,
  marca: string,
  unidade: string,
  quantidade: string,
  produto_id: string
};

const productSchema = zod.object({
  name: zod.string().min(3, 'Informe o nome do produto'),
  marca: zod.string().min(1, 'Informe o nome da marca'),
  unidade:zod.string().min(1, 'Informe o nome da marca'),
  quantidade:zod.string().min(1, 'Informe o nome da marca')
})

export  function AddProductOnListOfCotacao () {
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const {cotacaoState, dispatch} = useContext(ContacaoContext)
  const [prodctsList, SetProductsList] = useState([{}])
  const [selected, setSelected] = useState<Inputs>({
    _id: '',
    name:'' ,
    marca:'' ,
    unidade: '',
    quantidade:'',
    produto_id:''});
  const { control, handleSubmit, reset, watch, formState: { errors }, setValue, getValues} = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      _id: '',
      name: '',
      marca: '',
      unidade: '',
      quantidade: '',
      produto_id: ''
    }
  });


  const getData = async ()=>{axiosPrivate.get("produto/productslist")
    .then((response)=>SetProductsList(response.data))
    .then(response => console.log("Success:", response))
    .catch(error => console.error("Error:", error))}


  React.useEffect(()=>{
      getData()

  },[]);

  const [sds, setdsds] = useState('')
  const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {
    axiosPrivate.post("produto/cadastrodelista/"+location.state.idd, 
     JSON.stringify(data)).then((info)=>
      {dispatch({type:'UPDATE_ONE_COTACAO', payload: info.data})})
      .then(response => console.log("Sucess:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error))
      setValue('name', '')
      reset()
    }
    const defaultProps = {
      options: prodctsList, 
      getOptionLabel: (option: any) => option.nome
    };


    function handleChange (event: any, value:any){
      if(value===null){

        setSelected(value),
        setValue('marca', '' ),setValue('unidade', ''),
        setValue('name', ''), setValue('produto_id', '')

      }
      else{
      setSelected(value),
        setValue('marca', value.marca=null?'':value.marca ),setValue('unidade', value.unidade=='null'?'':value.unidade),
        setValue('name', value.nome=='null'?'': value.nome), setValue('produto_id', value._id=='null'?'':value._id)
      }
    }    
    
 
  return (
    <Box
    component="span"
    sx={{ padding: '40px', paddingLeft: '15px' }}> 
      <form onSubmit={handleSubmit(onSubmit)} style={{flexGrow: 1}} >
      <div>
        <Box sx={{display: "flex", alignItems: "center" }}>
        
        <Autocomplete
            placeholder = {"Descrição"}
            onChange = {handleChange}
            inputValue={watch('name')}
            {...defaultProps}
            sx={{paddingRight: '30px' , width: '300px'}}
            renderInput={(params) =>
              <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField
                {...params}
                {...field}
                required
                label = {'Produto'}
                placeholder={"Produto"}
                sx={{ paddingRight: '15px' }} />} />}/>

        <Controller
            name="marca"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            label = {'Marca'}
            placeholder = {"Marca"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
            name="quantidade"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            placeholder = {"Quantidade"}
            label = {'Quantidade'}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
         name="unidade"
         control={control}
         
         render={({ field }) =><TextField
         {...field}
         required
         label = {'unidade'}
         placeholder = {"Quantidade"}
         sx={{paddingRight: '15px'}}
         />}/>
      <Button 
            
            type="submit"
            variant="contained"
            sx={{ width: '100px', left: "1.5rem", height: "3.2rem" }}
          > Atualizar 
          </Button>
        </Box>
        
    </div>
    </form>
    
    </Box>
    )
}






  
