import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './style.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { axiosPrivate } from '../../../lib/axios';

interface data {
  vendedor: string,
  productName: string,
  valorUnitario: number,
  buyListSum: number
}[];

export const TransferModal = (props: any) => {
  const {idProduct, idCotacao} = props;
  const [columns, setColumns] = useState<data[]>([]);
  const handleclick = async ()=>{
    try {
    const response = await axiosPrivate.get('transferproduct/'+idProduct+'/'+idCotacao)
    setColumns(response.data.map((e: any)=>{
        return {
          vendedor: e.vendedor,
          productName: e.productName,
          valorUnitario: e.valorUnitario,
          buyListSum: e.buyListSum
      }})
    )

  }
  catch(err){
    console.log(err)
  }
}

  return (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="Button violet" onClick={handleclick}>
        Transferir
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <div>
          {columns.map((e:any)=>{return (
            <div>
              <div>{'Nome do Vendedor: '}{e.vendedor}</div>
              <div>{'Nome do Produto: '}{e.productName}</div>
              <div>{'Valor: '}{e.valorUnitario}</div>
              <div>{'Valor total da Lista de Compra: '}{e.buyListSum}</div>
            </div>
          )})}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)}
