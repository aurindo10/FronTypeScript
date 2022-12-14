import { Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BasicModal } from "../../components/Bar/register/modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { SnackbarDeleteButton } from "./DeleteButton";





export function BuyList (){
    const [isLoading, setIsLoading] = useState(true)
    const [allListToBuy, setallListToBuy] = useState([{}])
    const axiosPrivate = useAxiosPrivate()
    const getData = async ()=>{axiosPrivate.get("cotacoes/obtemtodaslistacomparadas")
      .then((response)=>setallListToBuy(response.data))
        .then(response => {console.log("Success:", response), setIsLoading(false)})
          .catch(error => console.error("Error:", error))};

    useEffect(()=>{
        getData()

    }, [])


return(
    
    <div> 
    <TableContainer component={Paper} sx={{ maxWidth: 800 }} key='tablecontainer'>
      {isLoading?<LinearProgress/>:
      <Table sx={{ maxWidth: 1000 }} aria-label="simple table"  key='table'>
        <TableHead>
          <TableRow>
            <TableCell>Nome da Cotacao</TableCell> 
            <TableCell align="right">Data de criacao</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ maxWidth: 800 }}>
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
                    <NavLink to={"/buylist/onebuylist/"+row._id}>
                          <Button>Verificar Lista</Button>
                    </NavLink>
                </TableCell>
                <TableCell>
                  <SnackbarDeleteButton
                     state={{setallListToBuy, idCotacaoToDelete: row.idCotacao}}>
                  </SnackbarDeleteButton>
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>}
    </TableContainer>
 
    </div>
  )

}