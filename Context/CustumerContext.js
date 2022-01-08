import { useState, useCallback, createContext, useEffect } from 'react';

import api from '../services/api';

const CustumerContext = createContext();

const tabele = "tbl_clientes"



function CustumerProvider({ children }) {

  const [ open, setOpen] = useState(false);

  const [ clientes, sclientes ] = useState([]);
  const [ cliente, scliente ] = useState();

  const set_open = useCallback((dados) => {
    setOpen(dados);
  },[])

  const set_cliente = useCallback((dados) => {
    scliente(dados);
  },[])




  const handleLista = useCallback(async() => {
    const {data} = await api.get(`ListFull/${tabele}`);
    sclientes(data.result);
  },[])

  const handleCria = useCallback(async(dados) => {
    await api.post(`Creat/${tabele}`,dados );
    await handleLista()
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

  
  useEffect(() => {
    
    async function getUser() {
      try {
        await handleLista()
      } catch (error) {
        console.log(error);
      }
    }
    getUser(); 
  }, []);
  

  return (
    <CustumerContext.Provider value={{ 
      open,
      clientes,
      cliente,

      set_cliente,
      set_open, 

      handleCria,
      handleLista,
      handleAtualiza,
      handleDeleta
    }}>
      {children}
    </CustumerContext.Provider>
  );
}


export { CustumerContext, CustumerProvider };