import { Button, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ContacaoContext } from "../../Cotacoes/CotacaoContext";



export const ButtonToTransfer = (props: any)=>{

    const {onListToBuy, setonListToBuy} = useContext(ContacaoContext)
    const {idProductfromCotacaoComparada, sellerInsideCotacao, vendedorId} = props
    const [isLoading, setIsLoading] = useState(false)

    const axiosPrivate = useAxiosPrivate()
    const HandleClick = async ()=>{
        setIsLoading(true)
        const idseller = onListToBuy.listas.filter((list: any)=>{
            return list.nomeDoVendedor == sellerInsideCotacao.vendedor
        })
        const SellerIdToBeUpdate = onListToBuy.listas.filter((list: any)=>{
            return list._id == vendedorId
        })
     const response = await axiosPrivate
    .post('transferproduct/'+onListToBuy._id+'/'+SellerIdToBeUpdate[0]._id+
    '/'+idProductfromCotacaoComparada+'/'+sellerInsideCotacao.vendedorId+'/'+onListToBuy._id+'/'+idseller[0]._id)
    if (response.status==200){
        const responseFromDelete = await axiosPrivate.post('transferproduct/'+onListToBuy._id+'/'+SellerIdToBeUpdate[0]._id+'/'+idProductfromCotacaoComparada)
        if (responseFromDelete.status==200){
            console.log('deletado com sucesso')
            console.log(responseFromDelete.data)
            setonListToBuy(responseFromDelete.data)
        }
    }
}
    return (
        <div>
        {isLoading ?<CircularProgress/>:
                <Button variant="contained" onClick={HandleClick}
                sx={{marginRight: '1rem', fontSize: '0.7rem'}}
                >Transferir</Button>
        }
        </div>
    )
}