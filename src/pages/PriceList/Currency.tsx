import { TextField } from "@mui/material";
import { NumberFormatBase } from "react-number-format";

export function MyCustomNumberFormat(props: any) {
    const format = (numStr: any) => {
      if (numStr === '0' ) return '';
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2,
      }).format(numStr/100);
    };
  
    return <NumberFormatBase {...props} format={format}  customInput={TextField}
    sx={{ '& label.Mui-focused':{
      color: 'black'
    },
    '& .MuiInputBase-input': {

      position: 'relative',
      color: '#1B1B1B',
      width: '14rem',
      height: '3rem',
      padding: '1px 1px',
      fontSize: '25px',
      fontFamily: [
        'Montserrat'
      ]
    },
  
  }}
  placeholder = {"R$"}
    
    />;
  }