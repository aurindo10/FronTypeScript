import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { render } from 'react-dom';
import { useNavigate } from "react-router-dom";
import { axiosFree } from "../../lib/axios"
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { ArrowFatLinesDown } from 'phosphor-react';
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

type Inputs = {
    nome: string,
    empresa: string
}
export function EntryPage (){

    const productSchema = zod.object({
    nome: zod.string().min(3, 'Vendedor: Informe o seu nome com mais de 3 digitos'),
    empresa: zod.string().min(3, {message:'Informe o nome da empresa com mais de 3 digitos'}),
  })

    const navigate = useNavigate();
    const [isLoading, setIsloadind] = useState(false)
    const {id} = useParams()
    const {control, handleSubmit, reset, watch, formState: { errors }, setValue, getValues} = useForm<Inputs>(
        {
            resolver: zodResolver(productSchema),
            defaultValues: {
                nome: '',
                empresa: ''

              }
          }
    ) 
    console.log()
    const onSubmit: SubmitHandler<Inputs>  = async (info: Inputs) => {
        setIsloadind(true)
           try {
            const response = await axiosFree.put("cotacoes/cadastravendedor", JSON.stringify(info))
                navigate(
                    "/pricelist/"+id+"/"+watch('nome')+'/'+
                    watch('empresa')+'/'+response.data._id)
                reset()
            
            }catch(err){ console.log(err)}}

    return (
        <Box
        sx={{backgroundColor:'#FF7A00'}}
        
        >
           <form onSubmit={handleSubmit(onSubmit)} >
            <Box sx={{display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            textAlign: 'center',
            justifyItems: 'center',
            alignItems: 'center',
            height: '100vh', 
            width: '100vw',
            boxSizing: 'border-box',
            paddingLeft: '10rem',
            paddingRight: '10rem'

        }}>
                 <Controller
                    name="nome"
                    control={control}
                    render={({ field }) =><TextField
                    {...field}
                    required
                    label={'vendedor'}
                    placeholder = {"Nome do vendedor"}
                    fullWidth 
                    sx={{
                    boxSizing: "border-box",
                    maxWidth: '30rem',
                    minWidth: '20rem',
                    }}
                    />}/>
                    <Controller
                    name="empresa"
                    control={control}
                    render={({ field }) =><TextField
                    {...field}
                    required
                    label={'Empresa'}
                    placeholder = {"Nome da empresa"}
                    fullWidth
                    sx={{
                    marginTop: '1rem',
                    boxSizing: "border-box",
                    maxWidth: '30rem',
                    minWidth: '20rem',
                    borderBlockColor: 'white',
                
                }}
                
                    />}/>
                    {errors.nome?.message && <p style={{color:'white', backgroundColor: "black"}}>{errors.nome?.message}!</p>}
                    {errors.empresa?.message && <p style={{color:'white', backgroundColor: "black"}}>{errors.empresa?.message}!</p>}
                    {isLoading&&<CircularProgress color="inherit"/>}
                    <Button
                    fullWidth
                    type="submit"
                    sx={{marginTop: '1rem',
                    borderWidth: "1px" ,
                    borderColor: "black",
                    borderStyle: "solid",
                    borderRadius: "25px",
                    backgroundColor:'black',
                    color: 'white',
                    maxWidth: '15rem',
                    minWidth: '10rem',
                    marginLeft: '10rem',
                marginRight: '10rem'
                }}
                    > Preencher </Button>
            </Box>
           
           </form>
           
        </Box>
    )

}