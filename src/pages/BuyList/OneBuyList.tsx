import { AlertProps, Box, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridColDef, GridFooter, GridFooterPlaceholder, GridRowModel, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Formatter } from "../../lib/Formatter";
import { priceFormatter } from "../../Utils/Formatter";
import { TransferModal } from './ProductTransfer/TransferModal'
import React, { useContext } from 'react';

import { ContacaoContext } from "../Cotacoes/CotacaoContext";


interface BuyList {
    idCotacao:'',
    _id: string,
    listas: [{
            nomeDoVendedor: string,
            empresa: string,
            ProductListToBuy: [
                {   
                    _id: string,
                    productName: string,
                    marca: string,
                    unidade: string,
                    quantidade: number,
                    valorUnitario: number,
                    quantidadeMinima: number
                }]
            }]
        }


export function OneBuyList (){
    const [isLoading, setIsLoading] = React.useState(true)
    const {onListToBuy, setonListToBuy} = useContext(ContacaoContext)
    const axiosPrivate = useAxiosPrivate()
    const {idbuylist} = useParams()

    const getData = async ()=>{ axiosPrivate.get("cotacoes/obtemlistacomparada/"+idbuylist)
        .then((response)=>setonListToBuy(response.data[0]))
            .then(response => {console.log("Success:", response), setIsLoading(false)})
                .catch(error => console.error("Error:", error))};

    useEffect(()=>{
        getData()
    }, [])
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
    
    const columns: GridColDef[] = [
        {
          field: 'productName',
          headerName: 'Nome do Produto',
          width: 360,
          editable: false,
        },
        {
          field: 'transfer',
          headerName: 'Transferir',
          width: 130,
          editable: false,
          renderCell: (params)=>{
            return(
              <TransferModal 
                idProduct={params.row.product_id}
                idProductfromCotacaoComparada = {params.row._id}
                onListToBuy={onListToBuy}
                vendedorId = {params.row.idsellerfinal}
                >
               </TransferModal>
            )
          }
        },
        {
            field: 'marca',
            headerName: 'Marca',
            width: 80,
            editable: false,
          },
        {
          field: 'quantidade',
          headerName: 'Quantidade',
          type: 'number',
          width: 110,
          editable: true,
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
      const listToRender = onListToBuy.listas

      const filteredList = listToRender.filter((e:any)=>{return e.ProductListToBuy.length > 0})
      const ref = React.createRef();

      function DataToPlotonTable (vendedor: string, empresa: string){
        return (
            <Box sx={{gap: 1}}>
                <h3>{'Vendedor:  '}{vendedor}</h3>
                <h3>{'Empresa:  '}{empresa}</h3>
                <CustomToolbar/>
            </Box>
        )
      }
    
        const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'
      > | null>(null);
        const processRowUpdate = React.useCallback(
          async (newRow: GridRowModel) => {
            const responseFromUpdate = await axiosPrivate.put('transferproduct/update/'+idbuylist+'/'+newRow.idsellerfinal
            +'/'+newRow._id,
            JSON.stringify(newRow)
            )
            const response = '' ;
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            return response;
          },
          [],
        );
        const handleProcessRowUpdateError = React.useCallback((error: Error) => {
          setSnackbar({ children: error.message, severity: 'error' });
        }, []); 

        
return (
    <Box sx={{ height: 700, width: '55rem' }}>
      
        {filteredList.map((oneList: any)=>{
         
          return (
                       <FullList oneList={oneList} processRowUpdate={processRowUpdate} handleProcessRowUpdateError={handleProcessRowUpdateError}
                        columns={columns} isLoading = {isLoading} DataToPlotonTable={DataToPlotonTable}></FullList> 
            )})}
                                      
    </Box>



)}

export function FullList (props: any){
  const [totalPrice, setTotalPrice] = useState(0)
  const {oneList, processRowUpdate,  columns, handleProcessRowUpdateError, isLoading, DataToPlotonTable} = props
  function Suml () {
    
    return  (<div style={{ textAlign: 'right'}}>
    <div style={{marginRight: '1rem'}}>{'Soma Total: '}</div>
    <div style={{marginRight: '1rem'}}>{priceFormatter.format(totalPrice)}</div> 
    <GridFooter/>
    </div>)
  }
    return (
      <div style={{ display: 'flex', height: '40rem', marginTop:'2rem' }}>
                            <div style={{ flexGrow: 1 }}>
                            {isLoading?<LinearProgress />:
                                <DataGrid 
                                    key={oneList._id}
                                    getRowId={(r) => r._id}
                                    rows={oneList.ProductListToBuy.map((e:any)=>{return {...e, idsellerfinal: oneList._id}})}
                                    columns={columns}
                                    pageSize={100}
                                    processRowUpdate={processRowUpdate}
                                    onProcessRowUpdateError={handleProcessRowUpdateError}
                                    experimentalFeatures={{ newEditingApi: true }}
                                    components={{LoadingOverlay: LinearProgress,
                                      Footer: ()=>{
                                        return Suml()},
                                      Toolbar:()=>{ {return DataToPlotonTable(oneList.nomeDoVendedor, oneList.empresa)}}}}
                                    rowsPerPageOptions={[5]}
                                                              onStateChange={(state)=>{
                                      const visibleRows = Object.entries(state.rows.idRowsLookup)
                                      const info =  visibleRows.map((e:any)=>{
                                        return  (e[1])  
                                      })
                                      if(Object.entries(state.editRows).length>0){
                                      const idToupdate = Object.entries(state.editRows)
                                      const productsToUpdate =  idToupdate.map((ite:any)=>{
                                        return {
                                          idd: ite[0],
                                          quantidade: ite[1].quantidade.value}
                                      })
                                      const infoWithDataEdited = info.map((item: any)=>{
                                        let qtd = item.quantidade
                                        const daslkdas = productsToUpdate.filter((e)=>{
                                          return item._id==e.idd
                                        })
                                        if(daslkdas[0]){
                                        if(item._id==daslkdas[0].idd)
                                        {
                                          qtd=daslkdas[0].quantidade
                                        }
                                        {
                                          return {
                                            ...item, quantidade: qtd
                                          }
                                        }
                                      }
                                      return {
                                        ...item
                                      }
                                      

                                      })
                                          const sumFinal = infoWithDataEdited.map((oneList: any)=>{
                                            return oneList.valorUnitario*oneList.quantidade}).reduce((a: any,b: any)=>{
                                                  return (a+b)
                                              }, 0)
                                              setTotalPrice(sumFinal)  } 

                                              else {
                                                const visibleRows = Object.entries(state.rows.idRowsLookup)
                                      const info =  visibleRows.map((e:any)=>{
                                        return  (e[1])  
                                      })
                                      if(Object.entries(state.editRows)){
        
                                      const sumFinal = info.map((oneList: any)=>{
                                        return oneList.valorUnitario*oneList.quantidade}).reduce((a: any,b: any)=>{
                                              return (a+b)
                                          }, 0)
                                          setTotalPrice(sumFinal)
                                              }
                                    }}}
                                    disableSelectionOnClick
                                        />}
                            </div>
                        </div>



    )





}