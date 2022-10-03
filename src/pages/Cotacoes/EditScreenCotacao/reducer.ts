import { produce } from 'immer'
import { data } from '../cotacoesList/CotacaoList';





export interface state {
  cotacao: data[],
  productsOfCotacao?: [{}]
}



export function reducerCotacao (state: state, action: any) {
    switch (action.type) {
      case 'SetCotacao':
        // console.log(action.payload)
        return produce(state, (draft)=>{
          draft.cotacao=action.payload
        });
      case 'SetProductsOfCotacao':  
        return produce(state, (draft) => {
          draft.productsOfCotacao=action.payload
        });      
      case 'UPDATE_COTACAO':
        return produce(state, (draft)=>{
          console.log(action.payload)
          console.log(state.cotacao)  
          draft.cotacao.push(action.payload);
        });      

      default:
        return state
    }
  }
  