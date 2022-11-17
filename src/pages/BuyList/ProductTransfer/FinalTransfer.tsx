import { Button } from "@mui/material";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";


export const ButtonToTransfer = (props: any)=>{

    
    const {onListToBuy, idProductfromCotacaoComparada, sellerInsideCotacao, vendedorId} = props
    console.log(sellerInsideCotacao.vendedorId)
    const axiosPrivate = useAxiosPrivate()
    // const responseFromDelete = axiosPrivate.post('')
    const HandleClick = async ()=>{
        const idseller = onListToBuy.listas.filter((list: any)=>{
            return list.nomeDoVendedor == sellerInsideCotacao.vendedor
        })
        const SellerIdToBeUpdate = onListToBuy.listas.filter((list: any)=>{
            return list._id == vendedorId
        })
        console.log('transferproduct/'+onListToBuy._id+'/'+SellerIdToBeUpdate[0]._id+
        '/'+idProductfromCotacaoComparada+'/'+sellerInsideCotacao.vendedorId+'/'+onListToBuy._id+'/'+idseller[0]._id)

     await axiosPrivate
    .post('transferproduct/'+onListToBuy._id+'/'+SellerIdToBeUpdate[0]._id+
    '/'+idProductfromCotacaoComparada+'/'+sellerInsideCotacao.vendedorId+'/'+onListToBuy._id+'/'+idseller[0]._id)}


    return (
        <Button variant="contained" onClick={HandleClick}>Contained</Button>
    )
}