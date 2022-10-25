import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { ContacaoContext } from '../CotacaoContext';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const inicialState = {
  cotacao: [{}],
  productsOfCotacao: [{}]
}

type Inputs = {
    cotacaoName: string,
};

const productSchema = zod.object({
  cotacaoName: zod.string().min(3, 'Informe o nome da cotacao'),
})

export  function CotacaoRegister() {
  const axiosPrivate = useAxiosPrivate()
  const {cotacaoState, dispatch} = useContext(ContacaoContext)  
  const { control, handleSubmit, reset, formState: { errors }} = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
        cotacaoName: '',
    }
  });
 
  const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {axiosPrivate.post("produto/cadastrodelista", 
        JSON.stringify(data)).then((info)=>{
        dispatch({type:'UPDATE_COTACAO',  payload: info.data})})
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
            name="cotacaoName"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            placeholder = {"Nome da Cotação"}
            sx={{paddingRight: '15px'}}
            />}/>

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






  
