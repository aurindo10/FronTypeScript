import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


interface BuyList {
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

    const columns: GridColDef[] = [
        {
          field: 'productName',
          headerName: 'Nome do Produto',
          width: 150,
          editable: false,
        },
        {
          field: 'unidade',
          headerName: 'Unidade',
          width: 150,
          editable: false,
        },
        {
            field: 'marca',
            headerName: 'Marca',
            width: 150,
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
          field: 'valorUnitario',
          headerName: 'Valor Unitario',
          description: '',
          sortable: false,
          width: 160,
          editable: false
        },
        {
            field: 'quantidadeMinima',
            headerName: 'Quantidade Minima',
            description: '',
            sortable: false,
            width: 160,
            editable: false,
        }
      ];
      console.log(onListToBuy.listas)
      const listToRender = onListToBuy.listas
      const ref = React.createRef();
return (
    <div style={{ height: 400, width: '100%' }}>

        {listToRender.map((oneList: any)=>{return (
                        <div style={{ display: 'flex', height: '100%' }}>
                            <div style={{ flexGrow: 1 }}>
                                <h2>{'Vendedor:  '}{oneList.nomeDoVendedor}</h2>
                                <h4>{'Empresa:  '}{oneList.empresa}</h4>

                                <DataGrid 
                                    getRowId={(r) => r._id}
                                    rows={oneList.ProductListToBuy}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    disableSelectionOnClick
                                        />
                            </div>

                        </div>
            )})}
    </div>



)



}