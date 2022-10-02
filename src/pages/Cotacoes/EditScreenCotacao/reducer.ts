import { produce } from 'immer'
import { data } from '../cotacoesList/CotacaoList';





export interface state {
  cotacao?: data[],
  productsOfCotacao?: [{}]
}



export function reducerCotacao (state: state, action: any) {
    switch (action.type) {
      case 'SetCotacao':
        // console.log(action.payload)
        return produce(state, (draft)=>{
          draft.cotacao=action.payload
          console.log(state.cotacao)
        });
      case 'SetProductsOfCotacao':  
        return produce(state, draft => {
          draft.productsOfCotacao!=action.payload
        })
      default:
        return state
    }
  }
  