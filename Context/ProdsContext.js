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


  
  const handleListaLike = useCallback(async(dados) => {
    const {data} = await api.get(`ListByColLike/tbl_produtos/descricao_prod/${dados}`);
    sprods(data.result);
  },[])


  const handleLista = useCallback(async() => {

    const {data} = await api.get(`ListFull/tbl_produtos`);
    sprods(data.result);

  },[])
  const handleListaByCol = useCallback(async(id, col) => {
    if(id!=0){
      const {data} = await api.get(`/ListByCol/tbl_produtos/${col}/${id}`);
      sprods(data.result);
    }else{
      await handleLista()
    }
  },[handleLista])






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
      handleListaLike,
      handleListaByCol,
      handleLista,
      handleAtualiza,
      handleDeleta
    }}>
      {children}
    </ProdContext.Provider>
  );
}








export { ProdContext, ProdsProvider };