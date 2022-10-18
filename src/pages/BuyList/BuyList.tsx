import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BasicModal } from "../../components/Bar/register/modal";
import { SnackbarDeleteButton } from "./DeleteButton";





export function BuyList (){
    const [allListToBuy, setallListToBuy] = useState([{}])

    const getData = async ()=>{await fetch("http://localhost:3002/cotacoes/obtemtodaslistacomparadas", {
    headers: {"Content-Type": "application/json"},
    method: "GET"})
    .then(response => response.json())
    .then((response)=>setallListToBuy(response))
    .then(response => console.log("Success:", response))
    .catch(error => console.error("Error:", error))};


    useEffect(()=>{
        getData()

    }, [])


return(
    
    <div> 
    <TableContainer component={Paper} sx={{ maxWidth: 1000 }} key='tablecontainer'>
      <Table sx={{ maxWidth: 1000 }} aria-label="simple table"  key='table'>
        <TableHead>
          <TableRow>
            <TableCell>Nome da Cotacao</TableCell> 
            <TableCell align="right">Data de criacao</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allListToBuy.map((row: any ) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {row.nomeDaCotacao}
              </TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell>
              {/* <Button onClick={()=>DeleteProduct(row._id)}
              >Deletar</Button> */}
              </TableCell>
              <TableCell>
                <NavLink to={"/buylist/onebuylist/"+row.idCotacao}>
                 <Button>Verificar Lista</Button>
                </NavLink>
                  <SnackbarDeleteButton
                     state={{setallListToBuy, idCotacaoToDelete: row.idCotacao}}>
                  </SnackbarDeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 
    </div>
  )

}