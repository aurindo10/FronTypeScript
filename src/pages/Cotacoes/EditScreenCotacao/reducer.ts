import { produce } from 'immer'
import { data } from '../cotacoesList/CotacaoList';



export interface productOfListCotation {
  _id: string,
  name: string,
  marca: string,
  unidade: string,
  quantidade: string,
  produto_id: string
}

export interface state {
  cotacao: data[],
  productsOfCotacao: productOfListCotation[]

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

      default:
        return state
    }
  }
  