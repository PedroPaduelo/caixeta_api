import { useContext } from 'react';
import { ProdContext } from '../Context/ProdsContext'

export function useProd(){

  const { 
    open,
      prods,
      prod,
      
      set_sprod,
      set_open, 

      handleCria,
      handleLista,
      handleAtualiza,
      handleDeleta
   } = useContext(ProdContext);

  return {
    open,
      prods,
      prod,
      
      set_sprod,
      set_open, 

      handleCria,
      handleLista,
      handleAtualiza,
      handleDeleta
  }
}