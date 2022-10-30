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
import zIndex from '@mui/material/styles/zIndex';
import logo from './logo.svg'
import logo2 from './logo2.svg'
import { width } from '@mui/system';


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
    <Box sx={{ flexGrow: 1,  display:'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexDirection: 'column'}}>
              <Box sx={{  alignItems: 'center', justifyContent: 'center', position: 'relative', height: "100vh"}}>
                <Box sx={{}}>
                  <Box sx={{ backgroundColor: "#FB5300",
                  height: '42rem',
                  borderRadius: '0px 0px 100px 100px'}}>
                    
                    
                  <Box sx={ { backgroundColor: '#1B1B1B',
                    width: "100vw", 
                    height: '3.7rem', borderRadius: '0px 0px 23px 23px', display:'flex', alignItems: 'center', justifyContent: 'center',
                    

                    }}>
                      <img src={logo} style={{width: '4.68rem', position: 'absolute', top: '.7rem'}}></img>
                    </Box> 
                    
                  <Box 
                    sx={{ height: '20rem', position: 'relative', display: 'flex',  flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', alignContent: 'center'
                    ,top: "3rem", minWidth: '10rem', textAlign: 'center'}}>
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
                                            <Box sx={{ minWidth: "23rem", position: 'relative', top: "7rem"
                                  }}>
                         <MobileStepper
                                    sx={{ backgroundColor: "#FB5300"
                                  }}
                                      variant="text"
                                      steps={maxSteps}
                                      position="static"
                                      activeStep={cotacaoState.activeStep}
                                      nextButton={
                            <Button
                              size="small"
                              onClick={handleNext}
                              disabled={cotacaoState.activeStep === maxSteps - 1}
                              sx={{
                                backgroundColor:'#FF7A00'
                              , color: 'white',
                            fontFamily: "'Montserrat' ",
                            fontWeight: "900px",
                            borderWidth: "1px" ,
                            borderColor: "#FFFFFF",
                            borderStyle: "solid",
                            borderRadius: "25px",
                            textAlign: 'left',
                            // borderRadius: "12px 0px 0px 12px",


                            }}
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
                            <Button size="small" onClick={handleBack} disabled={cotacaoState.activeStep === 0}
                            sx={{backgroundColor:'#FF7A00'
                            , color: 'white',
                          fontFamily: "'Montserrat' ",
                          fontWeight: "900px",
                          borderWidth: "1px" ,
                          borderColor: "#FFFFFF",
                          borderStyle: "solid",
                          borderRadius: "25px",
                          textAlign: 'left',
                          // borderRadius: "0px 12px 12px 0px",


                          }}
                            
                            
                            >
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
                      
                  </Box>
                  
                  </Box>
              </Box>

              <Box style={{width: '15rem',  display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                position: 'relative',
                top: '1rem',
                left: '8px'
                }}>
                <img src={logo2} ></img>
              </Box>


          </Box>
          <Box sx={ { backgroundColor: '#1B1B1B',
                    width: "100vw", 
                    height: '2.7rem', borderRadius: '23px 23px 0px 0px',
                    position: 'absolute',
                    bottom: '0px',
                    }}></Box>
    </Box>
    
    </ThemeProvider>
  );
}
