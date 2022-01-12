import { useState, useCallback, createContext } from 'react';

import api from '../services/api';

const ProdContext = createContext();


function ProdsProvider({ children }) {

  const [ open, setOpen] = useState(false);

  const [ openLanca, setOpenLanca] = useState(false);

  const [ prodsLanca, sprodsLanca ] = useState([]);
  const [ itensLancaList, sitensLancaList ] = useState([]);
  const [ total, stotal] = useState(0);

  const [ prods, sprods ] = useState([]);
  const [ prod, sprod ] = useState();

  const set_open = useCallback((dados) => {
    setOpen(dados);
  },[])
  const set_open_lanca = useCallback((dados) => {
    setOpenLanca(dados);
  },[])
  const set_sprod = useCallback((dados) => {
    sprod(dados);
  },[])
  const set_sprods_lanca = useCallback((dados) => {
    sprodsLanca(dados);
  },[])

  const set_itens_lanca_list = useCallback((dados) => {

    const auxiTotal = (parseFloat(total) + parseFloat(dados.total)).toFixed(2);
    stotal(auxiTotal)

    sitensLancaList([...itensLancaList, dados]);
  },[itensLancaList])
  const remove_itens_lanca_list = useCallback((dados, i) => {

    const auxiTotal = (parseFloat(total) - parseFloat(dados.total)).toFixed(2)
    stotal(auxiTotal)

    const list = [...itensLancaList];

    list.splice(i, 1);

    sitensLancaList(list);
  },[itensLancaList])
  const reset_itens_lanca_list = useCallback(() => {
    stotal(0)
    sitensLancaList([]);
  },[itensLancaList])


  
  const handleListaLike = useCallback(async(dados) => {
    const {data} = await api.get(`ListByColLike/tbl_produtos/descricao_prod_lowercase/${dados}`);
    sprods(data.result);
  },[])
  const handleListaLikeLanca = useCallback(async(dados) => {
    const {data} = await api.get(`ListByColLike/tbl_produtos/descricao_prod_lowercase/${dados}`);
    sprodsLanca(data.result);
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
  const handleAtualizaLotLanca = useCallback(async(dados) => {

    console.log(dados)
    
    dados.map(async(dado) => {
      await api.put(`Update/tbl_produtos`,{
        id: dado.id,
        preco_de_custo: dado.preco_de_custo_new,
        markup: dado.markup_new,
        qtd_em_estoque: dado.quantidade_new,
      } );
    })

    await handleLista()

    sitensLancaList([])
    setOpenLanca(false)

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
      openLanca,
      prodsLanca,
      total,
      itensLancaList,


      set_sprod,
      set_open, 
      set_open_lanca,
      set_sprods_lanca,

      set_itens_lanca_list,
      remove_itens_lanca_list,
      reset_itens_lanca_list,

      handleCria,
      handleListaLike,
      handleListaLikeLanca,
      handleListaByCol,
      handleLista,
      handleAtualiza,
      handleDeleta,
      handleAtualizaLotLanca
    }}>
      {children}
    </ProdContext.Provider>
  );
}








export { ProdContext, ProdsProvider };