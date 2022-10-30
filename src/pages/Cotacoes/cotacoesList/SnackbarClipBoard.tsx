import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TableCell, TextField } from '@mui/material';
import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import { ShareNetwork } from 'phosphor-react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export  function SnackbarClipBoard (props:any) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
      const Link = ("https://cotacaojs.vercel.app/pricelist/"+props.idCotacaoo)
        setOpen(true)
        navigator.clipboard.writeText(Link.toString())
      };
    const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} 
      sx={{ width: '50px', left: "0rem", height: "2.2rem" }}
      variant="contained"><ShareNetwork size={32} /></Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"

      />
    </div>
  );
}
