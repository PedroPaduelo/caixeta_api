import { useState, useCallback, createContext } from 'react';

import api from '../services/api';

const SellItensContext = createContext();





function SellItensProvider({ children }) {

  const [ total, stotal] = useState(0);

  const [ itensSellList, sitensSellList ] = useState([]);

  const set_itens_sell_list = useCallback((dados) => {

    const auxiTotal = (parseFloat(total) + parseFloat(dados.total)).toFixed(2);
    stotal(auxiTotal)

    const list = [...itensSellList, dados];
    sitensSellList([...itensSellList, dados]);
  },[itensSellList])

  const remove_itens_sell_list = useCallback((dados, i) => {

    const auxiTotal = (parseFloat(total) - parseFloat(dados.total)).toFixed(2)
    stotal(auxiTotal)

    const list = [...itensSellList];

    list.splice(i, 1);

    sitensSellList(list);
  },[itensSellList])

  const reset_itens_sell_list = useCallback(() => {
    stotal(0)
    sitensSellList([]);
  },[itensSellList])

  return (
    <SellItensContext.Provider value={{ 
      itensSellList,
      total,

      set_itens_sell_list,
      remove_itens_sell_list,
      reset_itens_sell_list


    }}>
      {children}
    </SellItensContext.Provider>
  );
}


export { SellItensContext, SellItensProvider };