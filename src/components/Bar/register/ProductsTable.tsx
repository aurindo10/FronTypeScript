import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Button } from '@mui/material';
import { BasicModal } from './modal'; 
import { productsContext } from '../../../pages/cadastro/Cadastro'; 
import { useContext} from 'react'

export interface data {
  _id: string,
  nome: string,
  marca: string,
  unidade: string, 
  createdAt: string
}

export function BasicTable() {
    const {setProductList, productList} = useContext(productsContext)
    const getData = async ()=>{await fetch("http://localhost:3002/produto/productslist", {
    headers: {"Content-Type": "application/json"},
    method: "GET"})
    .then(response => response.json()).then((response)=>setProductList(response))
    .then(response => console.log("Success:", response))
    .catch(error => console.error("Error:", error))};
    
    React.useEffect(()=>{
        getData()
    },[]);
    const DeleteProduct = async (id:string)=>{
        await fetch ("http://localhost:3002/produto/cadastro/"+id, {
        method: "DELETE"
        }).then(response => console.log("Deletado com Sucesso:", response))
        .catch(error => console.error("Error:", error))
       
        setProductList(productList.filter((row: {_id: string}) => row._id !== id));   
    } 
    
  return (
    <div> 
    <TableContainer component={Paper} sx={{ maxWidth: 800 }} key='tablecontainer'>
      <Table sx={{ maxWidth: 800 }} aria-label="simple table"  key='table'>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell> 
            <TableCell align="right">Marca</TableCell>
            <TableCell align="right">Unidade</TableCell>
            <TableCell align="right">Data de criacao</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((row: data ) => (
            <TableRow
              key={row.nome}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {row.nome}
              </TableCell>
              <TableCell align="right">{row.marca}</TableCell>
              <TableCell align="right">{row.unidade}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell>
              <Button onClick={()=>DeleteProduct(row._id)}
              >Deletar</Button>
              </TableCell>
              <TableCell>
                <BasicModal dasdas={row} ></BasicModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 
    </div>
  );
}
