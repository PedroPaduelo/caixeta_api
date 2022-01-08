import { useContext } from 'react';
import { CustumerContext } from '../Context/CustumerContext'

export function useCustumer(){

  const { 
    open,
      clientes,
      cliente,

      set_cliente,
      set_open, 

      handleCria,
      handleLista,
      handleAtualiza,
      handleDeleta
   } = useContext(CustumerContext);

  return {
    open,
      clientes,
      cliente,

      set_cliente,
      set_open, 

      handleCria,
      handleLista,
      handleAtualiza,
      handleDeleta
  }
}