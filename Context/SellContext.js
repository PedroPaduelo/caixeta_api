import { useState, useCallback, createContext, useContext } from 'react';

import api from '../services/api';
import { AuthContext } from './AuthContext';

const SellContex = createContext();

const tabele = "tbl_vendas"



function SellProvider({ children }) {


  const { 
    user
  } = useContext(AuthContext);
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
  const handleAtualizaLotLanca = useCallback(async(dados) => {

    dados.map(async(dado) => {
      await api.put(`Update/tbl_produtos`,{
        id: dado.id,
        qtd_em_estoque: parseFloat(dado.quantidade_estoque) - parseFloat(dado.quantidade),
      } );
    })

  },[])
  const handleAtualizaLotLancaDelete = useCallback(async(dados) => {

    console.log(dados)

    // dados.map(async(dado) => {
    //   await api.put(`Update/tbl_produtos`,{
    //     id: dado.id,
    //     qtd_em_estoque: parseFloat(dado.quantidade_estoque) + parseFloat(dado.quantidade),
    //   } );
    // })

  },[])
  const handleLista = useCallback(async() => {
    const {data} = await api.get(`ListFull/${tabele}`);
    setVendas(data.result);
  },[])
  const handleListaVendasCaixa = useCallback(async(id) => {
    const {data} = await api.get(`ListByCol/${tabele}/referencia_externa/${id}`);
    setVendas(data.result);
  },[])
  const handleSumFullVendasCaixa = useCallback(async(id) => {
    const sell = await api.get(`SunByCol/tbl_vendas/preco_final/referencia_externa/${id}`);
    stotalSell(sell.data.result.sum);
  },[])
  const handleListaByCol = useCallback(async(id) => {
    const {data} = await api.get(`/ListByCol/${tabele}/cliente/${id}`);
    setVendasCliente(data.result);
  },[])
  const handleCria = useCallback(async(dados, id) => {
    await api.post(`Creat/${tabele}`,dados );
    await handleAtualizaLotLanca(dados.itens)
    await handleListaVendasCaixa(id)
    await handleSumFullVendasCaixa(id)
  },[])
  const handleAtualiza = useCallback(async(dados) => {
    
    await api.put(`Update/${tabele}`,dados );
    await handleLista()
    scliente();

  },[])
  const handleDeleta = useCallback(async(id) => {
    await api.delete(`DeletByCol/${tabele}/${id}`);
    await handleListaVendasCaixa(user.id)
    await handleSumFullVendasCaixa(user.id)
  },[])
  const handleDeletaVendaCliente = useCallback(async(id, id_client) => {
    await api.delete(`DeletByCol/${tabele}/${id}`);
    await handleListaByCol(id_client)
  },[])
  const handleListaLike = useCallback(async(dados) => {
    const {data} = await api.get(`ListByColLike/tbl_produtos/descricao_prod/${dados}`);
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
      handleListaVendasCaixa,
      handleSumFullVendasCaixa,
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