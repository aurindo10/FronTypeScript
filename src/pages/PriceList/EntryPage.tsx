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
    const onSubmit: SubmitHandler<Inputs>  = async (info: Inputs) => {
           try {
            const response = await axiosFree.put("cotacoes/cadastravendedor", JSON.stringify(info))
                navigate(
                    "/pricelist/"+id+"/"+watch('nome')+'/'+
                    watch('empresa')+'/'+response.data._id)
                reset()
            
            }catch(err){ console.log(err)}}

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