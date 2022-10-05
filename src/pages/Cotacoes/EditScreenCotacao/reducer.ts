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
        // console.log(action.payload)
        return produce(state, (draft)=>{
          draft.cotacao=action.payload
        });
      case 'SetProductsOfCotacao':  
        return produce(state, (draft) => {
          draft.productsOfCotacao=action.payload
          console.log(action.payload)
        });      
      case 'UPDATE_COTACAO':
        return produce(state, (draft)=>{
          console.log(action.payload)
          console.log(state.cotacao)  
          draft.cotacao.push(action.payload);
        });
      case 'UPDATE_ONE_COTACAO':
          return produce(state, (draft)=>{
            draft.productsOfCotacao!.push(action.payload);
            console.log(action.payload)
          });       

      default:
        return state
    }
  }
  