import { NumberFormatBase } from 'react-number-format';

function fixCurrentValue(props:any) {

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  }).format(parseFloat(props.value) / 100);

  return `${amount}`;

}

export function MyCustomNumberFormat (props:any) {

  return <NumberFormatBase {...props} format={fixCurrentValue} />}