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
  produto_id: string,
  unidade: string,
  valorUnitario: string,
  quantidadeMínima: number
  quantidade: number,  
};

export interface state {
  cotacao: data[],
  productsOfCotacao: productOfListCotation[]
  priceList: [{name:'',
  unidade: '',
  quantidade: '',
  _id: '',
  valorUnitario: '',
  quantidadeMínima: ''}]

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
            console.log(action.payload)
            draft.priceList = action.payload;
            });
      case 'UPDATE_PRODUCT_PRICE_LIST':
          return produce(state, (draft)=>{
            const objIndex = state.priceList.findIndex((obj) => {obj._id = action.payload.produto_id});

            console.log(state.priceList[0]._id)
            console.log(action.payload.produto_id)
            console.log(objIndex)
            console.log(draft.priceList[objIndex].quantidadeMínima)
            draft.priceList[objIndex].quantidadeMínima = action.payload.quantidadeMínima
            draft.priceList[objIndex].valorUnitario = action.payload.valorUnitario
            });         

      default:
        return state
    }
  }
  