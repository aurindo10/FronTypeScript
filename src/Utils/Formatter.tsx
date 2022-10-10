import { NumberFormatBase } from "react-number-format";
import { useRef } from 'react';

export function MyCustomNumberFormat(props:any) {
  let ref = useRef();
  const format = (numStr: any) => {
    if (numStr === "") return "";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(numStr);
  };
  return <NumberFormatBase {...props} format={format}/>;
}
