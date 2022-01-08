import { useContext } from 'react';
import { SellContex } from '../Context/SellContext'

export function useSell(){

  const { 
    open,
      produtoslist,
      cliente,
      produtoslistSell,

      set_cliente,
      set_open, 
      sprodutoslist,
      set_list_sell,

      handleCria,
      handleLista,
      handleListaLike,
      handleAtualiza,
      handleDeleta
   } = useContext(SellContex);

  return {
    open,
      produtoslist,
      cliente,
      produtoslistSell,

      set_cliente,
      set_open, 
      sprodutoslist,
      set_list_sell,

      handleCria,
      handleLista,
      handleListaLike,
      handleAtualiza,
      handleDeleta
  }
}