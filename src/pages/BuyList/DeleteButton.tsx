import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TableCell, TextField } from '@mui/material';
import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import { ShareNetwork, Trash } from 'phosphor-react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AlertDialog from '../../components/Alert/AlertDialog';


export  function SnackbarDeleteButton (props:any) {
   const axiosPrivate = useAxiosPrivate()
    const {setallListToBuy, idCotacaoToDelete} = props.state
    const [openOnSucess, setOpenOnSucess] = useState(false)
    const [openOnError, setOpenOnError] = useState(false)
    const handleDelete = async (id: string) => {
      
       axiosPrivate.delete ("cotacoes/deletalistacomparada/"+id)
       .then((response)=>{
          if (response.status === 200){
            setallListToBuy((e: any)=>{return e.filter((row: any)=> row.idCotacao !== id)})
          }
          else {
            setOpenOnError(true)
          }
        })
        .catch(error => console.error("Error:", error))
        
      };

  return (
    <Box>
      <Box>
          <AlertDialog deleteFunction={handleDelete}
          contentOnDialog={'SIM, DELETAR'}
          typeOfContentToDelete={'Lista Comparada'}
          id={idCotacaoToDelete}
          >
          </AlertDialog>
      </Box>
      <Snackbar 
        open={openOnError}
        onClose={() => setOpenOnError(false)}
        autoHideDuration={2000}
        message="Houve algum erro ao Deletar"
      />
    </Box>
  );
}
