import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";







export function PriceListByIdCotation (){
    const [data, setData] = useState([])
    const { idPriceList } = useParams()
    const getData = async ()=>{await fetch("http://localhost:3002/cotacoes/obtemlistdeprecoporlistadecotacao/"+idPriceList, {
        headers: {"Content-Type": "application/json"},
        method: "GET"})
        .then(response => response.json()).then((response)=>setData(response))
        .then(response => console.log("Success:", response))
        .catch(error => console.error("Error:", error))};

        useEffect(()=>{
            getData()
    
        }, [])
    
    


return (
        <div>
            
            {data.map((cotacao:any)=>{return (
                <div> 
                    <h2> {"Vendedor:  "+cotacao.vendedor}</h2>
                    <h3> {"Empresa:  "+cotacao.empresa}</h3>
                <TableContainer component={Paper} sx={{ maxWidth: 800 }} key='tablecontainer'>
                    <Table sx={{ maxWidth: 800 }} aria-label="simple table"  key='table'>
                        <TableHead>
                        <TableRow>
                            <TableCell>Nome do Produto</TableCell> 
                            <TableCell align="right">Unidade</TableCell>
                            <TableCell align="right">Marca</TableCell>
                            <TableCell align="right">Quantidade</TableCell>
                            <TableCell align="right">Valor Unitario</TableCell>
                            <TableCell align="right">Quantidade Minima</TableCell>  
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {cotacao.listOfProducts.map((row: any ) => (
                            <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >{row.productName} </TableCell>
                            <TableCell component="th" scope="row" >{row.unidade} </TableCell>
                            <TableCell component="th" scope="row" >{row.marca} </TableCell>
                            <TableCell component="th" scope="row" >{row.quantidade} </TableCell>
                            <TableCell component="th" scope="row" >{row.valorUnitario} </TableCell>
                            <TableCell component="th" scope="row" >{row.quantidadeMinima} </TableCell>
                            <TableCell>
                            {/* <Button onClick={()=>DeleteProduct(row._id)}
                            >Deletar</Button> */}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
                )})}
                

        </div>

    )


}