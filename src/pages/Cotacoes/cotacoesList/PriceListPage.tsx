import { Box, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertDialog from "../../../components/Alert/AlertDialog";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Formatter } from "../../../lib/Formatter";


export function PriceListByIdCotation (){
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
    const axiosPrivate = useAxiosPrivate()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { idPriceList } = useParams()
    const getData = async ()=>{
        axiosPrivate.get("cotacoes/obtemlistdeprecoporlistadecotacao/"+idPriceList)
        .then((response)=>{setData(response.data), console.log(response.data)})
        .then(response => {console.log("Success:", response), setIsLoading(false)})
        .catch(error => console.error("Error:", error))};
        useEffect(()=>{
            getData()
    
        }, [])

        const columns: GridColDef[] = [
            {
              field: 'productName',
              headerName: 'Nome do Produto',
              width: 340,
              editable: false,
              resizable: true
            },
           
            {
                field: 'marca',
                headerName: 'Marca',
                width: 80,
                editable: false,
                resizable: true
              },
            {
              field: 'quantidade',
              headerName: 'Quantidade',
              type: 'number',
              width: 110,
              editable: false,
              resizable: true
            },
             {
                field: 'unidade',
                headerName: 'Unidade',
                width: 80,
                editable: false,
              },
            {
              field: 'valorUnitario',
              headerName: 'Valor Unitario',
              description: '',
              sortable: false,
              width: 110,
              editable: false,
              renderCell: (params)=>{
                return(
                    <>{Formatter.format(params.row.valorUnitario)}</>
                )
              }
            },
          ];

          
        function deleteList (idList: string){axiosPrivate.delete('cotacoes/listdepreco/'+idList)
          .then(response => console.log("Deletado com Sucesso:", response.data))
          .catch(error => console.error("Error:", error))
          setData(data.filter((row: {_id: string}) => row._id !== idList));}

        function  DataToPlotonTable (vendedor: string, empresa: string, idList: string){

            return (
                <Box sx={{display: 'flex', gap: 2}}>
                    <h3>{'Vendedor:  '}{vendedor}</h3>
                    <h3>{'Empresa:  '}{empresa}</h3>
                    <AlertDialog 
                      deleteFunction={deleteList}
                      id={idList}
                      contentOnDialog={'SIM, DELETAR'}
                      typeOfContentToDelete={'lista cotada'}>
                    </AlertDialog>
                    <CustomToolbar/>
                </Box>
            )
          }
return (
  <div>{isLoading?<LinearProgress sx={{width: '47rem'}} />:
    <Box sx={{ height: '40rem', width: '48rem' }}>   
        {data.map((oneList:any)=>{return (
        <DataGrid
        getRowId={(r) => r._id}
        rows={oneList.listOfProducts}
        columns={columns}
        pageSize={100}
        components={{LoadingOverlay: LinearProgress,
            Toolbar:()=>{ return DataToPlotonTable(oneList.vendedor, oneList.empresa, oneList._id);}
          }}
        rowsPerPageOptions={[5]}
        sx={{marginTop: '2rem'}}
        disableSelectionOnClick
            />
        )})}  
    </Box>
  }</div>
    )
}