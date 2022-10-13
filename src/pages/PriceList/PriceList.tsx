import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { FormPriceList } from './FormPriceList';
import { ContacaoContext } from '../Cotacoes/CotacaoContext'; 
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


export  function PriceList() {
  const theme = useTheme();
  const {cotacaoState, dispatch} = useContext(ContacaoContext)
  const {id, sellerid} = useParams()
  const { priceList } = cotacaoState
  const maxSteps = priceList.length;
  

  const getAllData = async ()=>{
    await fetch("http://localhost:3002/produto/cotacoes/"+id, {
    headers: {"Content-Type": "application/json"},
    method: "GET"})
    .then(response => response.json())
    .then((response)=>{ return dispatch({type:"SET_PRODUCT_PRICE_LIST", payload: response.products.map((e: any)=>{return {
          productName: e.name,
          product_id: e._id,
          unidade: e.unidade,
          quantidade: e.quantidade,
          valorUnitario: priceList[cotacaoState.activeStep].valorUnitario,
          quantidadeMinima: priceList[cotacaoState.activeStep].quantidadeMinima,
          vendedorId: sellerid
          }
          
        }
      )
    }
   )
  }
)
    .catch(error => console.error("Error:", error))
  } 
  const handleNext = () => {
    dispatch({type:"HANDLE_SCREAN", payload: 'handleNext'})
  };
  const handleBack = () => {
    dispatch({type:"HANDLE_SCREAN", payload: 'handleBack'})
  };
  useEffect(()=>{
      getAllData()
  },[]);
  return (
    <div>
    <Box sx={{ maxWidth: 900, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
        
      > 
        <Typography>{priceList[cotacaoState.activeStep].productName}</Typography>
      </Paper>
        <Box 
        
        sx={{ height: 255, maxWidth: 900, width: '100%', p: 2, display: "inline-block" }}>
            <FormPriceList 
                productName= {priceList[cotacaoState.activeStep].productName}
                product_id = {priceList[cotacaoState.activeStep].product_id}
                unidade = {priceList[cotacaoState.activeStep].unidade}
                quantidade= { priceList[cotacaoState.activeStep].quantidade}
                valorUnitario={ priceList[cotacaoState.activeStep].valorUnitario}
                quantidadeMinima={ priceList[cotacaoState.activeStep].quantidadeMinima}
                vendedorId = {priceList[cotacaoState.activeStep].vendedorId}
            ></FormPriceList>
        </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={cotacaoState.activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={cotacaoState.activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={cotacaoState.activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
    </div>
  );
}
