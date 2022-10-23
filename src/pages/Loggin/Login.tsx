import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { ContacaoContext } from '../Cotacoes/CotacaoContext';
import axios from '../../lib/axios';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate, Link } from 'react-router-dom';


export type InputsLogin = {
    admin: any; 
    email: string,
    password: string
};

// const productSchema = zod.object({
//   cotacaoName: zod.string().min(3, 'Informe o nome da cotacao'),
// })

export  function Login() {
    const [status, setStatus] = useState('')
    const { setAuth2 } = useAuth();
    const navigate  = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";
    const { auth, setAuth, token, setTonken } = useContext(ContacaoContext)
    
    const { control, handleSubmit, reset, formState: { errors }} = useForm<InputsLogin>({
    // resolver: zodResolver(productSchema),
    defaultValues: {
        email: '',
        password: ''
    }
  });
 
  const  HandleLogin = async (data: InputsLogin) =>{ 
    
    axios.post("/user/login",
     JSON.stringify(data),
     {
       headers: { 'Content-Type': 'application/json' },
       withCredentials: true
     }
   
   ).then((response: any)=>{
     setAuth2({ email: data.email, data: response.password , admin: data.admin, accessToken: response.data.accessToken })
     navigate(from, { replace: true });
     ;})
   .catch(error => console.error("Error:", error))
    
}
  const onSubmit: SubmitHandler<InputsLogin>  = async (data: InputsLogin) => {  
    await HandleLogin(data)
    
  }
  return (
    <Box
    component="span"
    sx={{ padding: '40px', paddingLeft: '15px' }}> 
      <form onSubmit={handleSubmit(onSubmit)} style={{flexGrow: 1}} >
      <div>
        <Box sx={{display: "flex", alignItems: "center" }}>
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
            > Entrar 
            </Button>
        </Box>
    </div>
    </form>
            {status && (<span> {status}</span>)}
    </Box>
    )
}






  
