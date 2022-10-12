import { produce } from 'immer'
import { data } from '../cotacoesList/CotacaoList';
import { Inputs} from '../../PriceList/FormPriceList'


export interface productOfListCotation {
  _id: string,
  name: string,
  marca: string,
  unidade: string,
  quantidade: string,
  produto_id: string
}

export interface PriceList {
  productName: string,
  product_id: string,
  unidade: string,
  valorUnitario: number,
  quantidadeMinima: number
  quantidade: number,  
};

export interface state {
  cotacao: data[],
  productsOfCotacao: productOfListCotation[]
  priceList: [{
    productName:'',
    product_id: '',
    unidade: '',
    valorUnitario: number,
    quantidadeMinima: number,
    quantidade: number,
  }],
  activeStep:number
}



export function reducerCotacao (state: state, action: any) {
    switch (action.type) {
      case 'SetCotacao':
        return produce(state, (draft)=>{
          draft.cotacao=action.payload
        });
      case 'SetProductsOfCotacao':  
        return produce(state, (draft) => {
          draft.productsOfCotacao=action.payload
        });      
      case 'UPDATE_COTACAO':
        return produce(state, (draft)=>{
          draft.cotacao.push(action.payload);
        });
      case 'UPDATE_ONE_COTACAO':
          return produce(state, (draft)=>{
            draft.productsOfCotacao!.push(action.payload);
          }); 
      case 'SET_PRODUCT_PRICE_LIST':
          return produce(state, (draft)=>{
            draft.priceList = action.payload;
            });
      case 'UPDATE_PRODUCT_PRICE_LIST':
          return produce(state, (draft)=>{
            draft.priceList[draft.activeStep].quantidadeMinima = action.payload.quantidadeMinima
            draft.priceList[draft.activeStep].valorUnitario = action.payload.valorUnitario
            });    
      case 'HANDLE_SCREAN':
          return produce(state, (draft)=>{
            if (action.payload==='handleNext')
                    {
                      draft.activeStep = draft.activeStep + 1
                    }         
            else 
              { 
                  draft.activeStep = draft.activeStep - 1 
              }
           })         

      default:
        return state
    }
  }
  