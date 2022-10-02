import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import {cotacaoListContext} from '../Cotacoes'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useReducer } from 'react';
import {reducerCotacao} from '../EditScreenCotacao/reducer'

export interface data{
  _id: string,
  cotacaoName: string,
  products: [{}], 
  createdAt: string
}
const inicialState = {
  cotacao: []
}

export function CotacaoList() {
    const [state, dispatch] = useReducer(reducerCotacao, inicialState )
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
       
        dispatch({type: "SetCotacao", payload: state.cotacao.filter((row: {_id: string}) => row._id !== id)}) 
    } 
    
  return (
    <div> 
    <TableContainer component={Paper} sx={{ maxWidth: 800 }} key='tablecontainer'>
      <Table sx={{ maxWidth: 800 }} aria-label="simple table"  key='table'>
        <TableHead>
          <TableRow>
            <TableCell>Nome da Lista</TableCell>
            <TableCell align="right">Data de criacao</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.cotacao.map((row: data ) => (
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
              <TableCell><NavLink to = '/cotacoes/edit' style={{ textDecoration: 'none', color:'black' }}><Button>Editar</Button></NavLink></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 
    </div>
  );
}