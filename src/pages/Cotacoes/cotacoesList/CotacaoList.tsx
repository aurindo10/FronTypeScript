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
import AlertDialogDemo from '../../../components/Alert/AlertDialog';
import { BasicSelect } from '../cotacaoRegister/Select';
import { constants } from 'fs/promises';


export interface data{
  _id: string,
  cotacaoName: string,
  products: [{}], 
  createdAt: string
}




export function CotacaoList() {
    const [isLoading, setIsLoading] = React.useState(true)
    const {cotacaoState, dispatch} = useContext(ContacaoContext)
    const {cotacao} = cotacaoState
    const axiosPrivate = useAxiosPrivate()

    const getData = async ()=>{
      axiosPrivate.get("produto/cotacoes")
    .then((response)=>dispatch({type: "SetCotacao", payload: response.data}))
    .then(response =>{ console.log("Success:", response),setIsLoading(false)})
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
      const HandleCLickGenerate = async (idCOtacao:any)=>{
       const verifyList =  await axiosPrivate.get("cotacoes/obtemlistdeprecoporlistadecotacao/"+idCOtacao)
        if(verifyList.data.length>0){
        const getData =  ()=>{axiosPrivate.get("cotacoes/compara/"+idCOtacao)
          .then(() => {

              alert("Lista Cadastrada com Sucesso")
          })
          .catch(error => alert(error.response.data.msg))};
          getData()
    }
    else{ alert('Nenhum vendedor enviou lista de cota????o')}
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
        headerName: 'Data de Cria????o',
        width: 150,
        editable: false,
      },
      {
        field: 'cotacoes',
        headerName: 'Cota????es',
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
        field: 'status',
        headerName: 'Status',
        width: 250,
        editable: false,
        renderCell: (props)=>{
          return (
            <Box ><BasicSelect idCotacaoo={props.row._id} statusFromServer= {props.row.status}
            sellerAmount={props.row?.sellerAmount|0}
            ></BasicSelect></Box> 
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
              <AlertDialogDemo deleteFunction={DeleteProduct}
              typeOfContentToDelete={'Lista'}
              id={props.row._id}
              contentOnDialog={'SIM, DELETAR'}
              >
              </AlertDialogDemo>
          )
        }
      }

    ]
    
  return (
        <div>
          {isLoading?<LinearProgress sx={{ width: '47rem' }}/>:
          <Box sx={{ height: 700, width: '62.8rem' }}>
          <DataGrid
            getRowId={(r) => r._id}
            rows={cotacao}
            columns={columns}
            pageSize={15}
            components={{LoadingOverlay: LinearProgress,}}
            rowsPerPageOptions={[15]}
            disableSelectionOnClick
          />
        </Box>}
        </div>
  );
}
