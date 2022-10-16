import React, { useState } from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer, usePDF } from '@react-pdf/renderer';
import { Button, Divider } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
;


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
]



export function Buttonsd (props: any){
const MyDocument = () =>{
    return (

        <Document>
          <Page >
            <View>
              <DataGrid 
                getRowId={(r) => r._id}
                rows={props.dataToRenderOnPdf.ProductListToBuy}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                                    />
                                    
             </View>
          
          </Page>
        </Document>

        )}

    return (

      <Button onClick={()=>{{console.log(props.dataToRenderOnPdf.ProductListToBuy)} ReactDOM.render(<MyDocument/>, document.getElementById('root'))}}>
        <MyDocument/>
            Baixar pdf 
      </Button> 


    )

}


                     