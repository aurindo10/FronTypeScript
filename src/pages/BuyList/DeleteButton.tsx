import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TableCell, TextField } from '@mui/material';
import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import { ShareNetwork, Trash } from 'phosphor-react';


export  function SnackbarDeleteButton (props:any) {
    const {setallListToBuy, idCotacaoToDelete} = props.state
    const [openOnSucess, setOpenOnSucess] = useState(false)
    const [openOnError, setOpenOnError] = useState(false)
    const handleDelete = async () => {
      await fetch ("http://localhost:3002/cotacoes/deletalistacomparada/"+idCotacaoToDelete, {
        method: "DELETE"
        }).then((response)=>{
          if (response.status === 200){
            setallListToBuy((e: any)=>{return e.filter((row: any)=> row.idCotacao !== idCotacaoToDelete)})
          }
          else {
            setOpenOnError(true)
          }
        })
        .catch(error => console.error("Error:", error))
        
      };

  return (
    <Box>
      <TableCell>
        <Button onClick={handleDelete} 
          sx={{ width: '50px', left: "0rem", height: "2.2rem" }}
          variant="contained"> <Trash size={15} /></Button>
      </TableCell>
      <Snackbar
        open={openOnError}
        onClose={() => setOpenOnError(false)}
        autoHideDuration={2000}
        message="Houve algum erro ao Deletar"
      />
    </Box>
  );
}
