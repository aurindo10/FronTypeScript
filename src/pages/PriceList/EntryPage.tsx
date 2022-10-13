import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { render } from 'react-dom';
import { useNavigate } from "react-router-dom";

type Inputs = {
    nome: string,
    empresa: string
}
export function EntryPage (){
    const navigate = useNavigate();
    const {id} = useParams()
    const {control, handleSubmit, reset, watch, formState: { errors }, setValue, getValues} = useForm<Inputs>(
        {
            // resolver: zodResolver(productSchema)
            defaultValues: {
                nome: '',
                empresa: ''

              }
          }
    ) 
    const onSubmit: SubmitHandler<Inputs>  = async (data: Inputs) => 
    {await fetch("http://localhost:3002/cotacoes/cadastravendedor", {
        headers: {"Content-Type": "application/json"},
        method: "PUT",
        body: JSON.stringify(data)}).then(response => response.json())
        .then((seller)=>{ navigate(
            "/pricelist/"+id+"/"+watch('nome')+'/'+
            watch('empresa')+'/'+seller._id)})
        .then(response => console.log("Sucess:", JSON.stringify(response)))
        .catch(error => console.error("Error:", error))
        reset()
      }


    return (
        <Box>
           <form onSubmit={handleSubmit(onSubmit)} >
           <Controller
            name="nome"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            label={'vendedor'}
            placeholder = {"Nome do vendedor"}
            sx={{paddingRight: '15px'}}
            />}/>
            <Controller
            name="empresa"
            control={control}
            render={({ field }) =><TextField
            {...field}
            required
            label={'Empresa'}
            placeholder = {"Nome da empresa"}
            sx={{paddingRight: '15px'}}
            />}/>
            <Button
            type="submit"
            > Preencher </Button>
           </form>
           
        </Box>
    )

}