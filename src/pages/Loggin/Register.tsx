import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";
import { axiosFree } from '../../lib/axios';
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'


type Inputs = {
    nome: string, 
    email: string,
    password: string

};

// const productSchema = zod.object({
//   cotacaoName: zod.string().min(3, 'Informe o nome da cotacao'),
// })

export  function RegistorDeUsuario() {
    const [status, setStatus] = useState('')
    const { control, handleSubmit, reset, formState: { errors }} = useForm<Inputs>({
    // resolver: zodResolver(productSchema),
    defaultValues: {
        nome: '',
        email: '',
        password: ''
    }
  });
 
  const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => {axiosFree.post("user/registrar", JSON.stringify(data))
        .then(response => {
        if (response.data.msg == 'Este email já está cadastrado')
        setStatus(response.data.msg)
        else{
         reset()
        }
        })
      .catch(error => console.error("Error:", setStatus(error)))


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
            placeholder = {"Nome"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
            name="email"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            type="email"
            placeholder = {"Email"}
            sx={{paddingRight: '15px'}}
            />}/>
        <Controller
            name="password"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            type="password"
            placeholder = {"Password"}
            sx={{paddingRight: '15px'}}
            />}/>
      <Button 
            type="submit"
            variant="contained"
            sx={{ width: '100px', left: "1.5rem", height: "3.2rem" }}
          > Registrar 
          </Button>
        </Box>
    </div>
    </form>
            {status && (<span> {status}</span>)}
    </Box>
    )
}






  
