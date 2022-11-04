import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, LinearProgress } from '@mui/material';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useReducer } from 'react';
import {reducerCotacao} from '../EditScreenCotacao/reducer'
import { ContacaoContext } from '../CotacaoContext';
import { display } from '@mui/system';
import { SnackbarClipBoard } from './SnackbarClipBoard';
import { FolderOpen, Plus, Trash, TreeStructure } from 'phosphor-react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


export interface data{
  _id: string,
  cotacaoName: string,
  products: [{}], 
  createdAt: string
}



export function CotacaoList() {
    const {cotacaoState, dispatch} = useContext(ContacaoContext)
    const {cotacao} = cotacaoState
    const axiosPrivate = useAxiosPrivate()
    const getData = async ()=>{
      axiosPrivate.get("produto/cotacoes")
    .then((response)=>dispatch({type: "SetCotacao", payload: response.data}))
    .then(response => console.log("Success:", response))
    .catch(error => console.error("Error:", error))};
    
    React.useEffect(()=>{
        getData()

    },[]);
    const DeleteProduct = async (id:string)=>{
      axiosPrivate.delete ("produto/cotacoes/"+id)
      .then(response => console.log("Deletado com Sucesso:", response.data))
        .catch(error => console.error("Error:", error))
          dispatch({type: "SetCotacao", payload: cotacaoState.cotacao!.filter((row: any)=> row._id !== id)}) 
    } 
    const ButtonToGenereteBuyList = (props:any)=>{
      const HandleCLickGenerate = (idCOtacao:any)=>{
        const getData = async ()=>{axiosPrivate.get("cotacoes/compara/"+idCOtacao)
          .then(() => {

              alert("Lista Cadastrada com Sucesso")
          })
          .catch(error => alert(error.response.data.msg))};
          getData()

    }
      return (
      <Box style={{display : 'inline'}}>
         <Button 
          type="submit"
          onClick={()=> HandleCLickGenerate(props.idCotacao)}><TreeStructure size={25} /></Button>
      </Box>
      )

    }
    const columns : GridColDef[] = [
      {
        field: 'cotacaoName',
        headerName: 'Nome da Lista',
        width: 200,
        editable: false,
      },  
      {
        field: 'createdAt',
        headerName: 'Data de Criação',
        width: 150,
        editable: false,
      },
      {
        field: 'cotacoes',
        headerName: 'Cotações',
        width: 80,
        editable: false,
        renderCell: (props)=>{
          return (
            <NavLink to = {{pathname: '/pricelistbyidcotation/'+props.row._id}}  state= {{idd:props.row._id}} style={{ textDecoration: 'none', color:'black' }}><Button
              type="submit"> <FolderOpen size={28} /></Button></NavLink>
          )
        }
      },
      {
        field: 'Editar',
        headerName: 'Editar',
        width: 80,
        editable: false,
        renderCell: (props)=>{
          return (
            <NavLink to = {{pathname: '/cotacoes/edit/'+props.row._id}}  state= {{idd:props.row._id}} 
                style={{ textDecoration: 'none', color:'black' }}>
                    <Button  sx={{ width: '50px', left: "0rem", height: "2.2rem" }}
                    > <Plus size={25} /></Button>
                   </NavLink>
          )
        }
      },
      {
        field: 'Gerador',
        headerName: 'Gerador',
        width: 80,
        editable: false,
        renderCell: (props)=>{
          return(
            <ButtonToGenereteBuyList idCotacao={props.row._id}/>
          )
        }
      },
      {
        field: 'link',
        headerName: 'Link',
        width: 80,
        editable: false,
        renderCell: (props)=>{
          return(
            <SnackbarClipBoard idCotacaoo={props.row._id}></SnackbarClipBoard>
          )
        }
      },
      {
        field: 'deletar',
        headerName: 'Deletar',
        width: 80,
        editable: false,
        renderCell: (props)=>{
          return (
              <Button onClick={()=>DeleteProduct(props.row._id)}>
                   <Trash size={28} />
              </Button>
          )
        }
      }

    ]
    
  return (
          <Box sx={{ height: 700, width: '47rem' }}>
          <DataGrid
            getRowId={(r) => r._id}
            rows={cotacao}
            columns={columns}
            pageSize={15}
            components={{LoadingOverlay: LinearProgress,}}
            rowsPerPageOptions={[15]}
            disableSelectionOnClick
          />
        </Box>
  );
}
