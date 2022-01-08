import { useState, useCallback, createContext } from 'react';

import api from '../services/api';

const PagamentoContext = createContext();

const tabele = "tbl_crediarios_pagos"



function PagamentoProvider({ children }) {

  const [ open, setOpen] = useState(false);


  const [ vendas, setVendas] = useState([]);
  const [ vendasCliente, setVendasCliente] = useState([]);

  const [ produtoslist, sprodutoslist ] = useState([]);
  const [ produtoslistSell, sprodutoslistSell ] = useState([]);
  const [ cliente, scliente ] = useState();



  const [ pagamentos, spagamentos] = useState([]);
  const [ pagamento, spagamento] = useState([]);

  const [ totalPago, stotalPago] = useState(0);






  const set_open = useCallback((dados) => {
    setOpen(dados);
  },[])

  const set_cliente = useCallback((dados) => {
    scliente(dados);
  },[])

  const set_list_sell = useCallback((dados) => {
    sprodutoslistSell([...produtoslistSell, dados]);
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
  },[])

  const handleAtualiza = useCallback(async(dados) => {
    
    await api.put(`Update/${tabele}`,dados );
    await handleLista()
    scliente();

  },[])

  const handleDeleta = useCallback(async(id) => {
    await api.delete(`DeletByCol/${tabele}/${id}`);
    await handleLista()
  },[])

  const handleListaLike = useCallback(async(dados) => {
    const {data} = await api.get(`ListByColLike/tbl_produtos/descricao_prod/${dados}`);
    console.log(data.result)
    sprodutoslist(data.result);
  },[])
  

  

  return (
    <PagamentoContext.Provider value={{ 
      open,
      produtoslist,
      cliente,
      produtoslistSell,
      vendas,
      vendasCliente,


      set_cliente,
      set_open, 
      sprodutoslist,
      set_list_sell,

      handleCria,
      handleLista,
      handleListaByCol,
      handleListaLike,
      handleAtualiza,
      handleDeleta
    }}>
      {children}
    </PagamentoContext.Provider>
  );
}


export { PagamentoContext, PagamentoProvider };