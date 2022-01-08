import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Fab,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext, useEffect, useMemo } from 'react';
import { SellContex } from '../../../Context/SellContext';
import TabelaFilter from './TabelaFilter';



const header = [
  {
    Header: 'ID',
    accessor: 'id',
    align: "left",
  },

  {
    Header: 'Tipo',
    accessor: 'tipo',
    align: "left"
  },

  {
    Header: 'Itens',
    accessor: 'itens',
    align: "left",
  },

  {
    Header: 'Meio de pagamento',
    accessor: 'meio_pagto',
    align: "center",
  },

  {
    Header: 'Preço',
    accessor: 'preco_final',
    align: "right",
  },

  {
    Header: 'Ações',
    accessor: 'pendentes',
    align: "center",
    Cell: ({ row }) => (
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fab 
          size="small" 
          color="secondary" 
          aria-label="add"
          onClick={ async() => {
            await handleDeleta(row.id)
          }}
        >
          <DeleteForeverIcon />
        </Fab>
      </Grid>
    ),
  }

]

const headerHides = [
  "created_at",
  "updated_at",
  "user_created",
  "user_updated",
  "status",
  "cliente"
]









export const CustonListTableSellFull = (props) => {
  const { 
    vendas,
    totalSell,
    handleSumFull,
    handleLista,
    handleDeleta
  } = useContext(SellContex);

  
  useEffect(() => {
    
    async function getUser() {
      try {
        await handleSumFull()
        await handleLista()

      } catch (error) {
        console.log(error);
      }
    }
    getUser(); 
  }, []);










  return(
    <Box sx={{ mt: 3 }}>
      <Card {...props}>
  
        <Box
          component="main"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}
        >
          <CardHeader title="Vendas" />
          <CardHeader title={`Total vendido: R$ ${totalSell || 0.00}`} />
        </Box>
  
        <PerfectScrollbar>
  
          <Box sx={{ minWidth: 800 }}>

            <TabelaFilter
              headers = {header}
              rows = {vendas}
              headerHides = {headerHides}
              linePage={8}
              handleDeleta={handleDeleta}
            />

          </Box>
  
        </PerfectScrollbar>
  
      </Card>
    </Box>
  )
}


