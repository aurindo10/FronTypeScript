import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { axiosPrivate } from '../../../lib/axios';

export function BasicSelect(props: any) {
    const {idCotacaoo, statusFromServer} = props
    const [status, setStatus] = React.useState('');
type data = {
    status: string
}
  const handleChange = async (event: SelectChangeEvent) => {
    const data : data = {status: event.target.value as string}
    const response = await axiosPrivate.post('produto/updatestatus/'+idCotacaoo,
    JSON.stringify(data))
    if(response.status==200){
    setStatus(response.data)}
    else{
        console.log(response.status)
    };
  };
  React.useEffect(()=>{
    setStatus(statusFromServer as string)
  }, [])


  return (
    <Box sx={{ minWidth: 200, height: '4rem' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'Editando'}>Editando</MenuItem>
          <MenuItem value={'Aguardando Cotações'}>Aguardando Cotações</MenuItem>
          <MenuItem value={'Concluída'}>Concluída</MenuItem>
          <MenuItem value={'Finalizada'}>Finalizada</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}