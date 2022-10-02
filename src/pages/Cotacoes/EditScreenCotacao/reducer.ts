export function reducerCotacao (state: any, action: {
    payload: any; type: any; 
}) {
    switch (action.type) {
      case 'SetCotacao':
        return {state.cotacao.push(action.payload)};
      case 'SetProductsOfCotacao':
        return {...state, productsOfCotacao: action.payload};
      default:
        throw new Error();
    }
  }
  