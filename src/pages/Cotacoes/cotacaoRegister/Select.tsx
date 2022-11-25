import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { axiosPrivate } from '../../../lib/axios';




type Color = 'yellow' |'green'| 'red' | '#606060'
export function BasicSelect(props: any) {
    const [color, setColor] = React.useState<Color>('#606060')
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
    setStatus(response.data)
    switch(response.data){
      case 'Editando': setColor('#606060');
      break;
      case 'Aguardando': setColor('yellow');
      break;
      case 'Concluída': setColor('red');
      break;
      case 'Finalizada': setColor('green');
      break;
    }
    
  }
    else{
        console.log(response.status)
    };
  };
  React.useEffect(()=>{
    setStatus(statusFromServer as string)
    switch(statusFromServer){
      case 'Editando': setColor('#606060');
      break;
      case 'Aguardando': setColor('yellow');
      break;
      case 'Concluída': setColor('red');
      break;
      case 'Finalizada': setColor('green');
      break;
    }
  }, [])


  return (
    <Box sx={{ width: 200, height: '1.8rem', display: 'flex', alignItems: 'center' }}>
      <FormControl fullWidth sx={{ display: 'flex', alignItems: 'center'}}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Age"
          onChange={handleChange}
          sx={{ height: '2.5rem', width: 140}}
        >
          <MenuItem value={'Editando'}>Editando</MenuItem>
          <MenuItem value={'Aguardando'}>Aguardando</MenuItem>
          <MenuItem value={'Concluída'}>Concluída</MenuItem>
          <MenuItem value={'Finalizada'}>Finalizada</MenuItem>
        </Select>
      </FormControl>
      <Box>
      <Box sx={{
        height: '30px',
        width: '30px',
        borderStyle: 'solid',
        borderColor: color,
        borderRadius: '50%',
        backgroundColor: color,
        display: 'inlineBlock',
        marginLeft: ''
      }}></Box>
      </Box>
    </Box>
  );
}