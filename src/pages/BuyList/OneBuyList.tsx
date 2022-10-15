import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface BuyList {
    _id: string,
    listas: [{
            nomeDoVendedor: string,
            empresa: string,
            ProductListToBuy: [
                {   
                    _id: string,
                    productName: string,
                    unidade: string,
                    quantidade: number,
                    valorUnitario: number,
                    quantidadeMinima: number
                }]
            }]
        }


export function OneBuyList (){
    const {idbuylist} = useParams()
    const [onListToBuy, setonListToBuy] = useState<BuyList>({
        _id: '',
        listas: [{
                nomeDoVendedor: "",
                empresa: "",
                ProductListToBuy: [               
                     {
                    _id: "",
                    productName: "",
                    unidade:"" ,
                    quantidade: 0,
                    valorUnitario: 0,
                    quantidadeMinima:0
                     }
                 ]
                }]
            })


    const getData = async ()=>{await fetch("http://localhost:3002/cotacoes/obtemlistacomparada/"+idbuylist, {
    headers: {"Content-Type": "application/json"},
    method: "GET"})
    .then(response => response.json()).then((response)=>setonListToBuy(response[0]))
    .then(response => console.log("Success:", response))
    .catch(error => console.error("Error:", error))};


    useEffect(()=>{
        getData()

    }, [])

    const columns: GridColDef[] = [
        {
          field: 'productName',
          headerName: 'Nome do Produto',
          width: 150,
          editable: true,
        },
        {
          field: 'unidade',
          headerName: 'Unidade',
          width: 150,
          editable: true,
        },
        {
          field: 'quantidade',
          headerName: 'Quantidade',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'valorUnitario',
          headerName: 'Valor Unitario',
          description: '',
          sortable: false,
          width: 160
        },
        {
            field: 'quantidadeMinima',
            headerName: 'Quantidade Minima',
            description: '',
            sortable: false,
            width: 160
        }
      ];
      console.log(onListToBuy.listas)
      const tsdasdas = onListToBuy.listas
return (
    <div style={{ height: 400, width: '100%' }}>
        {tsdasdas.map((oneList: any)=>{return (
            <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid 
                        getRowId={(r) => r._id}
                        rows={oneList.ProductListToBuy}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                />
            </div>

            </div>
        )})}
    </div>



)



}