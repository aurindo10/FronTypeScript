import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './style.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { axiosPrivate } from '../../../lib/axios';
import { Formatter } from '../../../lib/Formatter';
import { ButtonToTransfer } from './FinalTransfer';

interface data {
  vendedor: string,
  productName: string,
  valorUnitario: number,
  buyListSum: number
}[];

export const TransferModal = (props: any) => {
  const {idProduct, onListToBuy, idProductfromCotacaoComparada, vendedorId} = props;
  const [columns, setColumns] = useState<data[]>([]);
  const handleclick = async ()=>{
    try {
    const response = await axiosPrivate.get('transferproduct/'+idProduct+'/'+onListToBuy.idCotacao)
    const list = response.data.map((e: any)=>{
        return {
          vendedor: e.vendedor,
          productName: e.productName,
          valorUnitario: e.valorUnitario,
          buyListSum: e.buyListSum,
          vendedorId: e.vendedorID
      }})
      setColumns(list.filter((e: any)=>{return e.valorUnitario>0}))
      console.log(list) 

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
        <div className='container'>
          {columns.map((e:any)=>{return (
            <div className='boxcontainer'>
              <div className='vendedor'>{e.vendedor}</div>
              <div className='produto'>{'Produto: '}<p>{e.productName}</p></div>
              <div className='valor'>{'Valor: '}{Formatter.format( e.valorUnitario)}</div>
              <div className='total'>{'Total: '}{Formatter.format(e.buyListSum)}</div>
              <ButtonToTransfer 
                  onListToBuy= {onListToBuy} 
                  idProductfromCotacaoComparada={idProductfromCotacaoComparada}
                  sellerInsideCotacao = {e}
                  vendedorId={vendedorId}
                  >
              </ButtonToTransfer>
            </div>
          )})}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)}
