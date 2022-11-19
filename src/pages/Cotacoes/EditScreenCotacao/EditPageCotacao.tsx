import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ContacaoContext } from '../CotacaoContext';
import { AddProductOnListOfCotacao } from './AddProductOnListCota/AddProductOnListCota'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AlertDialogDemo from '../../../components/Alert/AlertDialog';
 


const inicialState = {
  cotacao: [],
  productsOfCotacao: []
}



export  function EditPageCotacao() {
  const [isLoading, setIsLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const {idList} = useParams()
  const {cotacaoState, dispatch} = useContext(ContacaoContext)
  const getData = async ()=>{ axiosPrivate.get("produto/cotacoes/"+idList)
  .then((response)=>dispatch({type: "SetProductsOfCotacao", payload: response.data.products }))
  .then(response => {console.log("Success:", response), setIsLoading(false)})
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
  const columns : GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome do Produto',
      width: 340,
      editable: false,
    },  
    {
      field: 'unidade',
      headerName: 'Unidade',
      width: 150,
      editable: false,
    },
    {
      field: 'quantidade',
      headerName: 'Quantidade',
      width: 100,
      editable: false,
    },
    {
      field: 'marca',
      headerName: 'Marca',
      width: 130,
      editable: false,
      resizable: true
    },
    {
      field: 'Deletar',
      headerName: 'Deletar',
      width: 80,
      editable: false,
      renderCell: (props)=>{
        return(
          <AlertDialogDemo
           deleteFunction={DeleteProduct}
           id={props.row._id}
           typeOfContentToDelete={'Produto'}
           contentOnDialog={'SIM, DELETAR'}
          ></AlertDialogDemo>
        )
      }
    },

  ]
return (
  <div> 
  <AddProductOnListOfCotacao ></AddProductOnListOfCotacao>
  {isLoading?<LinearProgress sx={{ width: '53rem' }}/>:
  <DataGrid
            getRowId={(r) => r._id}
            rows={productsOfCotacao}
            columns={columns}
            pageSize={10}
            components={{LoadingOverlay: LinearProgress,}}
            rowsPerPageOptions={[15]}
            disableSelectionOnClick
            sx={{height: '40rem', width: '52rem'}}
          />}
  </div>
);
}
