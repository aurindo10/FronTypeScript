import { Modal } from "./ModalForm";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { productsContext } from '../../../../pages/cadastro/Cadastro';
import { useContext } from 'react';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import useAxiosPrivate  from '../../../../hooks/useAxiosPrivate'
import * as zod from 'zod'



type Inputs = {
    _id: string,
  nome: string,
  marca: string,
  unidade: string,
};

const productSchema = zod.object({
  nome: zod.string().min(3, 'Informe o nome do produto'),
  marca: zod.string().min(2, 'Informe o nome da marca'),
  unidade:zod.string().min(1, 'Informe o nome da marca')
})

export  function ModalForm({handleClose, productInfotoUpdateOnModal}: any) {
  const axiosPrivate = useAxiosPrivate()
  const productToBeUpdated = productInfotoUpdateOnModal
  const {setProductList, productList} = useContext(productsContext)
  const { control, handleSubmit, reset, formState: { errors }} = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      _id: productToBeUpdated.info.row._id,
      nome: productToBeUpdated.info.row.nome,
      marca: productToBeUpdated.info.row.marca,
      unidade: productToBeUpdated.info.row.unidade,
    }
  });
 
  const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {
    handleClose(false)
     axiosPrivate.post("produto/editproduct/"+productToBeUpdated.info.row._id, 
      JSON.stringify(data))
      .then((e)=>{
        const index = productList.findIndex((x: { _id: any; })=>{ return (x._id === productToBeUpdated.info.row._id)});
        if (index === -1)
          console.log('falhou')
        else {
        handleClose(false)
        setProductList(
             [
               ...productList.slice(0,index),
               Object.assign({}, productList[index], e.data),
               ...productList.slice(index+1)
            ]
        )}})
      
      .then(response => console.log("Sucess:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error))
      reset()
    }
      
  return (
    
    
    <Box
    component="span"
    sx={{ padding: '40px', paddingLeft: '15px' }}> 
      <form onSubmit={handleSubmit(onSubmit)} style={{flexGrow: 1}} >
      <div>
        <Box sx={{display: "flex", alignItems: "center" }}>
        <Controller
            name="nome"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            placeholder = {"Descrição"}
            sx={{paddingRight: '15px'}}
            />}/>
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






  
