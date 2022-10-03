import Button from '@mui/material/Button';
import { useContext, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ContacaoContext } from '../CotacaoContext';
import { AddProductOnListOfCotacao } from './AddProductOnListCota/AddProductOnListCota'

const inicialState = {
  cotacao: [],
  productsOfCotacao: []
}



export  function EditPageCotacao() {
  const {cotacaoState, dispatch} = useContext(ContacaoContext)
  const getData = async ()=>{await fetch("http://localhost:3002/produto/cotacoes/633b331dd8ba4bb864d6a54c", {
  headers: {"Content-Type": "application/json"},
  method: "GET"})
  .then(response => response.json()).then((response)=>dispatch({type: "SetProductsOfCotacao", payload: response.products }))
  .then(response => console.log("Success:", response))
  .catch(error => console.error("Error:", error))};
  

  useEffect(()=>{
    getData()
    console.log(cotacaoState)
  },[]);
  const DeleteProduct = async (id:string)=>{
      await fetch ("http://localhost:3002/produto/cadastro/"+id, {
      method: "DELETE"
      }).then(response => console.log("Deletado com Sucesso:", response))
      .catch(error => console.error("Error:", error))
     
      dispatch({type: "setProductsOfCotacao", payload: cotacaoState.productsOfCotacao.filter((row: {_id: string}) => row._id !== id)});   
  } 
return (
  <div> 
  <AddProductOnListOfCotacao ></AddProductOnListOfCotacao>
  <TableContainer component={Paper} sx={{ maxWidth: 800 }} key='tablecontainer'>
    <Table sx={{ maxWidth: 800 }} aria-label="simple table"  key='table'>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell> 
          <TableCell align="right">Unidade</TableCell>
          <TableCell align="right">Quantidade</TableCell>
          <TableCell align="right">Data de criacao</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cotacaoState.productsOfCotacao.map((row: any ) => (
          <TableRow
            key={row._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" >
              {row.name}
            </TableCell>
            <TableCell align="right">{row.unidade}</TableCell>
            <TableCell align="right">{row.quantidade}</TableCell>
            <TableCell align="right">{row.createdAt}</TableCell>
            <TableCell>
            <Button onClick={()=>DeleteProduct(row._id)}
            >Deletar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  </div>
);
}
