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
import { ThemeProvider } from '@mui/material/styles';
import { solTheme } from '../../DefaultLayout/style';
import { axiosFree } from "../../lib/axios"


export  function PriceList() {
  const theme = useTheme();
  const {cotacaoState, dispatch} = useContext(ContacaoContext)
  const {id, sellerid} = useParams()
  const { priceList } = cotacaoState
  const maxSteps = priceList.length;
  

  const getAllData = async ()=>{
    axiosFree.get("produto/cotacoes/"+id)
    .then((response)=>{ return dispatch({type:"SET_PRODUCT_PRICE_LIST", payload: response.data.products.map((e: any)=>{return {
          productName: e.name,
          product_id: e._id,
          marca: e.marca,
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
    <ThemeProvider theme={solTheme}>
    <div>
    <Box sx={{ flexGrow: 1}}>
        <Box 
        
        sx={{ height: 500, width: '100%', display: "inline-block" }}>
            <FormPriceList 
                productName= {priceList[cotacaoState.activeStep].productName}
                product_id = {priceList[cotacaoState.activeStep].product_id}
                marca = {priceList[cotacaoState.activeStep].marca}
                unidade = {priceList[cotacaoState.activeStep].unidade}
                quantidade= { priceList[cotacaoState.activeStep].quantidade}
                valorUnitario={ priceList[cotacaoState.activeStep].valorUnitario}
                quantidadeMinima={ priceList[cotacaoState.activeStep].quantidadeMinima}
                vendedorId = {priceList[cotacaoState.activeStep].vendedorId}
            ></FormPriceList>
        </Box>
      <MobileStepper
       sx={{bgcolor:"gray"}}
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
            Próximo
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
            Anterior
          </Button>
        }
      />
    </Box>
    </div>
    </ThemeProvider>
  );
}
