import { useState, useCallback, createContext } from 'react';

import api from '../services/api';

const ProdContext = createContext();


function ProdsProvider({ children }) {

  const [ open, setOpen] = useState(false);

  const [ prods, sprods ] = useState([]);
  const [ prod, sprod ] = useState();

  const set_open = useCallback((dados) => {

    
    setOpen(dados);
  },[])

  const set_sprod = useCallback((dados) => {
    sprod(dados);
  },[])

  const handleLista = useCallback(async() => {

    const {data} = await api.get(`ListFull/tbl_produtos`);
    sprods(data.result);


  },[])

  const handleCria = useCallback(async(dados) => {
    await api.post(`Creat/tbl_produtos`,dados );
    await handleLista()
  },[])

  const handleAtualiza = useCallback(async(dados) => {
    
    await api.put(`Update/tbl_produtos`,dados );
    await handleLista()
    sprod();

  },[])

  const handleDeleta = useCallback(async(id) => {
    
    await api.post(`DeletByCol/tbl_produtos/${id}`);
    await handleLista()

  },[])

  

  

  return (
    <ProdContext.Provider value={{ 
      open,
      prods,
      prod,

      set_sprod,
      set_open, 

      handleCria,
      handleLista,
      handleAtualiza,
      handleDeleta
    }}>
      {children}
    </ProdContext.Provider>
  );
}








export { ProdContext, ProdsProvider };