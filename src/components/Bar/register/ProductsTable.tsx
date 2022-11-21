import * as React from 'react';
import { useState } from 'react';
import { Box, Button, LinearProgress } from '@mui/material';
import { BasicModal } from './modal'; 
import { productsContext } from '../../../pages/cadastro/Cadastro'; 
import { useContext} from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Trash } from 'phosphor-react';
import AlertDialogDemo from '../../Alert/AlertDialog';


export interface data {
  _id: string,
  nome: string,
  marca: string,
  unidade: string, 
  createdAt: string
}

export function BasicTable() {
  const [isLoading, setIsLoading] = React.useState(true)
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
        <GridToolbarFilterButton nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
        <GridToolbarDensitySelector nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
          
  const DeleteProduct = async (id: string)=>{
    axiosPrivate.delete("produto/cadastro/"+id)
    .then(response => console.log("Deletado com Sucesso:", response.data))
    .catch(error => console.error("Error:", error))
    setProductList(productList.filter((row: {_id: string}) => row._id !== id));   
  }
  const columns : GridColDef[] = [
    {
      field: 'nome',
      headerName: 'Produto',
      width: 300,
      editable: false,
    },
    {
      field: 'marca',
      headerName: 'Marca',
      width: 150,
      editable: false,
    },
    {
      field: 'unidade',
      headerName: 'Unidade',
      width: 110,
      editable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Data de criação',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160
    },
    {
        field: 'deletar',
        headerName: 'Deletar',
        description: 'Botões de deletar',
        sortable: false,
        width: 80,
        renderCell: (params: GridRenderCellParams<data>) => {
          
          return (
              <AlertDialogDemo deleteFunction={DeleteProduct} id={params.row._id}
              typeOfContentToDelete={'produto'}
              contentOnDialog={'SIM, DELETAR'}
              >
                
                
                 </AlertDialogDemo>
          );
        }
    },
    {
      field: 'editar',
      headerName: 'Editar',
      description: 'Botões de editar',
      sortable: false,
      width: 80,
      renderCell: (params: GridRenderCellParams<data>) => {
        const {row} = params
        return (
            <BasicModal productInfotoUpdate={{row}} ></BasicModal>
        );
      }
  }
  ];
  

    const axiosPrivate = useAxiosPrivate()
    const {setProductList, productList} = useContext(productsContext)
  React.useEffect(()=>{
      let isMounted = true;
      const controller = new AbortController();

      const getData =  async ()=>{ 
        try{
            const response = await axiosPrivate.get("/produto/productslist/",
            {signal: controller.signal})
            isMounted && setProductList(response.data);
            setIsLoading(false)

      }catch(err) {
             console.log(err)  
      }
    }
    getData()
    return () => {
      isMounted = false;
      controller.abort();
  }
  
  },[]);

    
  return (
    <Box sx={{ height: 700, width: '55rem', marginTop: '1rem' }}>
    {isLoading?<LinearProgress />:
      <DataGrid
        getRowId={(r) => r._id}
        rows={productList}
        columns={columns}
        pageSize={15}
        components={{Toolbar:CustomToolbar, LoadingOverlay: LinearProgress,}}
        rowsPerPageOptions={[15]}
        disableSelectionOnClick
      />}
    </Box>

  );
}
