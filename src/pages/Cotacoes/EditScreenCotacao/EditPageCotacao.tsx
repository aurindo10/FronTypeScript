import * as React from 'react';
import Button from '@mui/material/Button';
import { useContext, useEffect } from 'react';
import { cotacaoListContext } from '../Cotacoes'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BasicModal } from './Modal/modal copy';
import { useReducer } from 'react';
import { reducerCotacao} from './reducer'

const inicialState = {
  cotacao: [],
  productsOfCotacao: []
}



export  function EditPageCotacao() {
  const [state, dispatch] = useReducer(reducerCotacao, inicialState )
  // const [productsOfCotacao, setProductsOfCotacao] = React.useState([{}])
  const getData = async ()=>{await fetch("http://localhost:3002/produto/cotacoes/63377d982399d5278975988e", {
  headers: {"Content-Type": "application/json"},
  method: "GET"})
  .then(response => response.json()).then((response)=>dispatch({type: "SetProductsOfCotacao", payload: response.products }))
  .then(response => console.log("Success:", response))
  .catch(error => console.error("Error:", error))};
  

  useEffect(()=>{
    getData()
    console.log(state.productsOfCotacao)
  },[]);
  const DeleteProduct = async (id:string)=>{
      await fetch ("http://localhost:3002/produto/cadastro/"+id, {
      method: "DELETE"
      }).then(response => console.log("Deletado com Sucesso:", response))
      .catch(error => console.error("Error:", error))
     
      dispatch({type: "setProductsOfCotacao", payload: state.productsOfCotacao.filter((row: {_id: string}) => row._id !== id)});   
  } 
return (
  <div> 
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
        {state.productsOfCotacao.map((row: any ) => (
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
            <TableCell>
              <BasicModal productInfotoUpdate={{row}} ></BasicModal>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  </div>
);
}
