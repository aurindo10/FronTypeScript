import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useReducer } from 'react';
import {reducerCotacao} from '../EditScreenCotacao/reducer'
import { ContacaoContext } from '../CotacaoContext';
import { display } from '@mui/system';


export interface data{
  _id: string,
  cotacaoName: string,
  products: [{}], 
  createdAt: string
}



export function CotacaoList() {
    const {cotacaoState, dispatch} = useContext(ContacaoContext)
    const getData = async ()=>{await fetch("http://localhost:3002/produto/cotacoes/", {
    headers: {"Content-Type": "application/json"},
    method: "GET"})
    .then(response => response.json()).then((response)=>dispatch({type: "SetCotacao", payload: response}))
    .then(response => console.log("Success:", response))
    .catch(error => console.error("Error:", error))};
    
    React.useEffect(()=>{
        getData()

    },[]);
    const DeleteProduct = async (id:string)=>{
        await fetch ("http://localhost:3002/produto/cotacoes/"+id, {
        method: "DELETE"
        }).then(response => console.log("Deletado com Sucesso:", response))
        .catch(error => console.error("Error:", error))
       
        dispatch({type: "SetCotacao", payload: cotacaoState.cotacao!.filter((row: any)=> row._id !== id)}) 
    } 
    const {cotacao} = cotacaoState


    const ComponentLink = (props:any)=>{
      
      const [link, setLink] = React.useState('')
      const HandleCLick = (idCOtacao:any)=>{
          setLink("http://127.0.0.1:5173/pricelist/"+idCOtacao)
      }
      return (
        <Box style={{display : 'flex'}}>
          <TableCell> <Button 
            type="submit"
            variant="contained"
            sx={{ width: '100px', left: "0rem", height: "3.2rem" }}
            onClick={()=> HandleCLick(props.idCotacaoo)}>Gerar Link</Button></TableCell>
          {link && (<p>
                Link: {link}
              </p>)}
        </Box>

      )

    }

  return (
    <div> 
    <TableContainer component={Paper} sx={{ maxWidth: 1200 }} key='tablecontainer'>
      <Table sx={{ maxWidth: 800 }} aria-label="simple table"  key='table'>
        <TableHead>
          <TableRow>
            <TableCell>Nome da Lista</TableCell>
            <TableCell align="right">Data de criacao</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cotacao!.map((row:any ) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {row.cotacaoName}
              </TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell>
              <Button onClick={()=>DeleteProduct(row._id)}
              >Deletar</Button>
              </TableCell>
              <TableCell ><NavLink to = {{pathname: '/cotacoes/edit/'+row._id}}  state= {{idd:row._id}} style={{ textDecoration: 'none', color:'black' }}><Button> Editar</Button></NavLink></TableCell>
              <TableCell ><NavLink to = {{pathname: '/pricelistbyidcotation/'+row._id}}  state= {{idd:row._id}} style={{ textDecoration: 'none', color:'black' }}><Button
              type="submit"
              variant="contained"
              sx={{ width: '100px', left: "0rem", height: "3.2rem" }}
              
              
              
              > Verificar Cotacoes</Button></NavLink></TableCell>
              <ComponentLink idCotacaoo={row._id}></ComponentLink>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 
    </div>
  );
}
