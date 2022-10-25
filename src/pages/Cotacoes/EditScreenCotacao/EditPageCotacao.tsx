import Button from '@mui/material/Button';
import { useContext, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ContacaoContext } from '../CotacaoContext';
import { AddProductOnListOfCotacao } from './AddProductOnListCota/AddProductOnListCota'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
 


const inicialState = {
  cotacao: [],
  productsOfCotacao: []
}



export  function EditPageCotacao() {
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const {idList} = useParams()
  const {cotacaoState, dispatch} = useContext(ContacaoContext)
  const getData = async ()=>{ axiosPrivate.get("produto/cotacoes/"+idList)
  .then((response)=>dispatch({type: "SetProductsOfCotacao", payload: response.data.products }))
  .then(response => console.log("Success:", response))
  .catch(error => console.error("Error:", error))};
  

  useEffect(()=>{
    getData()
  },[]);
  const DeleteProduct = async (idProduct:string)=>{
      axiosPrivate.delete('produto/cotacoes/'+location.state.idd+'/'+idProduct)
      .then(response => console.log("Deletado com Sucesso:", response.data))
      .catch(error => console.error("Error:", error))
      dispatch({type: "SetProductsOfCotacao", payload: cotacaoState.productsOfCotacao!.filter((row: any) => row._id !== idProduct)})

  } 
  const {productsOfCotacao} = cotacaoState
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
          <TableCell align="right">Marca</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {productsOfCotacao.map((cell: any ) => (
          <TableRow
            key={cell._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" >
              {cell.name}
            </TableCell>
            <TableCell align="right">{cell.unidade}</TableCell>
            <TableCell align="right">{cell.quantidade}</TableCell>
            <TableCell align="right">{cell.marca}</TableCell>
            <TableCell>
            <Button onClick={()=>DeleteProduct(cell._id)}
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
