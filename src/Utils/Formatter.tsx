import { NumberFormatBase } from "react-number-format";


export function MyCustomNumberFormat(props:any) {
  const format = (numStr: any) => {
    if (numStr === "") return "";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2

    }).format(numStr);
  };
  return <NumberFormatBase {...props} format={format}  decimalScale={3} allowLeadingZeros thousandSeparator="," />;
}
