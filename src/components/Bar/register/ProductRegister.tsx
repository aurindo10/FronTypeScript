import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from "styled-components"
import { productsContext } from '../../../pages/cadastro/Cadastro';
import { FormEvent, ChangeEvent, useContext } from 'react';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";

type Inputs = {
  _id: string,
nome: string,
marca: string,
unidade: string,
};

export  function FormPropsTextFields() {
  const {product, setProducts} = useContext(productsContext)
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      _id: "",
      nome:"" ,
      marca: "",
      unidade: "",
    }
  });


  const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {await fetch("http://localhost:3002/produto/cadastro", {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify(data)}).then(response => response.json())
      .then(response => console.log("Success:", JSON.stringify(response))).then(()=>{
        setProducts(product+1)})
      .catch(error => console.error("Error:", error))
      reset()
    }
      
  return (
    
    
    <Box
    component="span"
    sx={{ padding: '40px', paddingLeft: '15px', flexGrow: 1 }}> 
      <form onSubmit={handleSubmit(onSubmit)} style={{flexGrow: 1}} >
      <div>
        <Box sx={{display: "flex", alignItems: "center" }}>
        <Controller
            name="nome"
            control={control}
            render={({ field }) =><TextField
            {...field}
            placeholder = {"Descrição"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
            name="marca"
            control={control}
            render={({ field }) =><TextField
            {...field}
            placeholder = {"Marca"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
         name="unidade"
         control={control}
         render={({ field }) => <Select {...field} 
            sx={{width: '100px'}}>
            <MenuItem value={"m"}>metros</MenuItem>
            <MenuItem value={"uni"}>unidade</MenuItem>
            <MenuItem value={"kg"}>peso</MenuItem>
          </Select>}
        />
    
      <Button 
            
            type="submit"
            variant="contained"
            sx={{ width: '100px', left: "1.5rem", height: "3.2rem" }}
          > Cadastrar 
          </Button>
        </Box>
        
    </div>
    </form>
    
    </Box>
    
    
    )
}
