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


  const getData = async ()=>{await fetch("http://localhost:3002/produto/productslist", {
    headers: {"Content-Type": "application/json"},
    method: "GET"})
    .then(response => response.json()).then((response)=>SetProductsList(response))
    .then(response => console.log("Success:", response))
    .catch(error => console.error("Error:", error))}


    
  React.useEffect(()=>{
      getData()

  },[]);

  const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {
    console.log(data)
    await fetch("http://localhost:3002/produto/cadastrodelista/"+location.state.idd, {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify(data)}).then(response => response.json()).then((info)=>
      {dispatch({type:'UPDATE_ONE_COTACAO', payload: info})})
      .then(response => console.log("Sucess:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error))
      reset()
    }
    const defaultProps = {
      options: prodctsList, 
      getOptionLabel: (option: any) => option.nome
    };

  return (
    <Box
    component="span"
    sx={{ padding: '40px', paddingLeft: '15px' }}> 
      <form onSubmit={handleSubmit(onSubmit)} style={{flexGrow: 1}} >
      <div>
        <Box sx={{display: "flex", alignItems: "center" }}>
        
        <Autocomplete
            placeholder = {"Descrição"}
            onChange = {(event, value:any)=>{setSelected(value),
              setValue('marca', value.marca),setValue('unidade', value.unidade),
              setValue('name', value.nome), setValue('produto_id', value._id)}}
            {...defaultProps}
            inputValue={getValues('name')}
            sx={{paddingRight: '30px' , width: '300px'}}
            renderInput={(params) =>
              <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField
                {...params}
                {...field}
                required
                value={"ok"}
                placeholder={"Produto"}
                sx={{ paddingRight: '15px' }} />} />}/>

        <Controller
            name="marca"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
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
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
         name="unidade"
         control={control}
         render={({ field }) => <Select {...field} 
            sx={{width: '100px'}}
            required
            
            >
            <MenuItem value={"m"}>metros</MenuItem>
            <MenuItem value={"uni"}>unidade</MenuItem>
            <MenuItem value={"kg"}>peso</MenuItem>
          </Select>}
        />
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






  
