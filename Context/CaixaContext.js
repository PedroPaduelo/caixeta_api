import { useState, useCallback, createContext, useContext } from 'react';

import api from '../services/api';
import { AuthContext } from './AuthContext';

const CaixaContext = createContext();


function CaixaProvider({ children }) {

  const [ open, setOpen] = useState(false);

  const [ dinheiro, sdinheiro] = useState(0);
  const [ debito, sdebito] = useState(0);
  const [ credito, scredito] = useState(0);
  const [ pix, spix] = useState(0);
  const { 
    user,
  } = useContext(AuthContext);

  



  


  const handleLista = useCallback(async() => {
    const {data} = await api.get(`ListFull/tbl_caixa`);
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


  const handleSumByCold = useCallback(async(id) => {
    const sell = await api.get(`SunByCols/tbl_vendas/preco_final/referencia_externa/${id}/meio_pagto/Dinheiro`);

    sdinheiro(sell.data.result.sum || 0);
  },[])


  const handleSumByColdeb = useCallback(async(id) => {
    const sell = await api.get(`SunByCols/tbl_vendas/preco_final/referencia_externa/${id}/meio_pagto/Cartão de Debito`);

    sdebito(sell.data.result.sum || 0);
  },[])


  const handleSumByColcred = useCallback(async(id) => {
    const sell = await api.get(`SunByCols/tbl_vendas/preco_final/referencia_externa/${id}/meio_pagto/Cartão de Crédito`);

    scredito(sell.data.result.sum || 0);
  },[])


  const handleSumByColpix = useCallback(async(id) => {
    const sell = await api.get(`SunByCols/tbl_vendas/preco_final/referencia_externa/${id}/meio_pagto/Pix`);

    spix(sell.data.result.sum || 0);
  },[])







  const set_open = useCallback(async(dados) => {
    

    await handleSumByCold(user.caixa_id);
    await handleSumByColdeb(user.caixa_id)
    await handleSumByColcred(user.caixa_id);
    await handleSumByColpix(user.caixa_id)

    setOpen(dados);

  },[user?.caixa_id])







  const handleCria = useCallback(async(dados) => {
    await api.post(`Creat/tbl_caixa`, dados)
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

  const handleAtualizaVendas = useCallback(async(dados) => {
    console.log(dados)
      await api.put(`AtualizaVendasEmLot`, {dados} );
  },[])
  

  return (
    <CaixaContext.Provider value={{ 
      open,
      dinheiro,
      debito,
      credito,
      pix,

      set_open, 

      handleCria,
      handleListaByCol,
      handleLista,
      handleAtualizaVendas,
      handleAtualiza,
      handleDeleta,

      handleSumByCold,
      handleSumByColdeb,
      handleSumByColcred,
      handleSumByColpix
    }}>
      {children}
    </CaixaContext.Provider>
  );
}








export { CaixaContext, CaixaProvider };