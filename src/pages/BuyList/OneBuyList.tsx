import { Box, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridColDef, GridFooter, GridFooterPlaceholder, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Formatter } from "../../lib/Formatter";
import { priceFormatter } from "../../Utils/Formatter";
import { TransferModal } from './ProductTransfer/TransferModal'

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
    const axiosPrivate = useAxiosPrivate()
    const {idbuylist} = useParams()
    const [onListToBuy, setonListToBuy] = useState<BuyList>({
        idCotacao:'',
        _id: '',
        listas: [{
                nomeDoVendedor: "",
                empresa: "",
                ProductListToBuy: [               
                     {
                    _id: "",
                    productName: "",
                    marca: '',
                    unidade:"" ,
                    quantidade: 0,
                    valorUnitario: 0,
                    quantidadeMinima:0
                     }
                 ]
                }]
            })


    const getData = async ()=>{ axiosPrivate.get("cotacoes/obtemlistacomparada/"+idbuylist)
        .then((response)=>setonListToBuy(response.data[0]))
            .then(response => console.log("Success:", response))
                .catch(error => console.error("Error:", error))};

    useEffect(()=>{
        getData()

    }, [])
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
            console.log(params)
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
          editable: false,
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

      const filteredList = listToRender.filter((e)=>{return e.ProductListToBuy.length > 0})
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
      
function Suml (props: any) {
      const [totalPrice, setTotalPrice] = useState<{oneListId: string,productsSum: number}[]>([{oneListId: '',productsSum:0}]);
      useEffect(()=>{
        const sumFinal = filteredList.map((oneList: any)=>{
          return {
            oneListId: oneList._id,
            productsSum: oneList.ProductListToBuy.map((eachPriceOfProduct: any)=>{ 
              return eachPriceOfProduct.valorUnitario*eachPriceOfProduct.quantidade}).reduce((a: any,b: any)=>{
                return (a+b)
            }, 0)}})
            const total =  sumFinal.filter((i: any)=>{
                return  i.oneListId==props
              })
            setTotalPrice(total)

      },[])
          return (<div style={{ textAlign: 'right'}}>
          <div style={{marginRight: '1rem'}}>{'Soma Total: '}</div>
          <div style={{marginRight: '1rem'}}>{priceFormatter.format(totalPrice[0].productsSum)}</div> 
          <GridFooter/>
          </div>)
        }

return (
    <Box sx={{ height: 700, width: '55rem' }}>

        {filteredList.map((oneList: any)=>{
          console.log(oneList._id)
          return (
                        <div style={{ display: 'flex', height: '40rem', marginTop:'2rem' }}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGrid 
                                    key={oneList._id}
                                    getRowId={(r) => r._id}
                                    rows={oneList.ProductListToBuy.map((e:any)=>{return {...e, idsellerfinal: oneList._id}})}
                                    columns={columns}
                                    pageSize={100}
                                    components={{LoadingOverlay: LinearProgress,
                                      Footer: ()=>{
                                        return Suml(oneList._id)},
                                      Toolbar:()=>{ {return DataToPlotonTable(oneList.nomeDoVendedor, oneList.empresa)}}}}
                                    rowsPerPageOptions={[5]}
                                    disableSelectionOnClick
                                        />
                            </div>

                        </div>
            )})}
    </Box>



)



}