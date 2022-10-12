import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller,  SubmitHandler } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

type Inputs = {
    vendedor: string,
    empresa: string
}
export function EntryPage (){
    const {id} = useParams()
    const {control, handleSubmit, reset, watch, formState: { errors }, setValue, getValues} = useForm<Inputs>(
        {
            // resolver: zodResolver(productSchema)
            defaultValues: {
                vendedor: '',
                empresa: ''

              }
          }
    ) 
    
    return (
        <Box>
           <form >
           <Controller
            name="vendedor"
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
           </form>
           <NavLink to = {{pathname: "/pricelist/"+id+"/"+watch('vendedor')+'/'+watch('empresa')}}  style={{ textDecoration: 'none', color:'black' }}><Button> Preencher </Button></NavLink>
        </Box>
    )

}