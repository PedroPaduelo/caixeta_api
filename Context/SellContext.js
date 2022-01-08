import { useState, useCallback, createContext } from 'react';

import api from '../services/api';

const SellContex = createContext();

const tabele = "tbl_vendas"



function SellProvider({ children }) {

  const [ open, setOpen] = useState(false);


  const [ vendas, setVendas] = useState([]);
  const [ vendasCliente, setVendasCliente] = useState([]);
  const [ totalDevedor, stotalDevedor] = useState(0);

  const [ totalSell, stotalSell] = useState(0);





  const [ produtoslist, sprodutoslist ] = useState([]);
  const [ produtoslistSell, sprodutoslistSell ] = useState([]);
  const [ cliente, scliente ] = useState();

  const set_open = useCallback((dados) => {
    setOpen(dados);
  },[])

  const set_cliente = useCallback((dados) => {
    scliente(dados);
  },[])

  const set_list_sell = useCallback((dados) => {
    sprodutoslistSell([...produtoslistSell, dados]);
  },[])



  const handleSumFull = useCallback(async() => {
    const sell = await api.get(`SunFull/tbl_vendas/preco_final`);
    stotalSell(sell.data.result.sum);
  },[])


  const handleLista = useCallback(async() => {
    const {data} = await api.get(`ListFull/${tabele}`);
    setVendas(data.result);
  },[])

  const handleListaByCol = useCallback(async(id) => {
    const {data} = await api.get(`/ListByCol/${tabele}/cliente/${id}`);
    setVendasCliente(data.result);
  },[])

  const handleCria = useCallback(async(dados) => {
    await api.post(`Creat/${tabele}`,dados );
    await handleLista()
    await handleSumFull()
  },[])

  const handleAtualiza = useCallback(async(dados) => {
    
    await api.put(`Update/${tabele}`,dados );
    await handleLista()
    scliente();

  },[])

  const handleDeleta = useCallback(async(id) => {
    await api.delete(`DeletByCol/${tabele}/${id}`);
    await handleLista()
    await handleSumFull()
  },[])

  const handleDeletaVendaCliente = useCallback(async(id, id_client) => {
    await api.delete(`DeletByCol/${tabele}/${id}`);
    await handleListaByCol(id_client)
  },[])

  const handleListaLike = useCallback(async(dados) => {
    const {data} = await api.get(`ListByColLike/tbl_produtos/descricao_prod/${dados}`);
    console.log(data.result)
    sprodutoslist(data.result);
  },[])
  
  


  const handleSumByCol = useCallback(async(id) => {
    const sell = await api.get(`SunByCol/tbl_vendas/preco_final/cliente/${id}`);
    const pay = await api.get(`SunByCol/tbl_crediarios_pagos/valor_pago/id_cliente/${id}`);

    const total = sell.data.result.sum - pay.data.result.sum;
    stotalDevedor(total);
  },[])









  
  



  return (
    <SellContex.Provider value={{ 
      open,
      produtoslist,
      cliente,
      produtoslistSell,
      vendas,
      vendasCliente,
      totalDevedor,
      totalSell,


      set_cliente,
      set_open, 
      sprodutoslist,
      set_list_sell,

      handleCria,
      handleLista,
      handleListaByCol,
      handleListaLike,
      handleAtualiza,
      handleDeleta,
      handleDeletaVendaCliente,
      handleSumByCol,
      handleSumFull
    }}>
      {children}
    </SellContex.Provider>
  );
}


export { SellContex, SellProvider };