import { ProductCard } from "./product-card";
import { Box, Grid } from '@mui/material';
import { useEffect, useMemo } from "react";
import { useTable , usePagination, useFilters, useAsyncDebounce, useGlobalFilter} from 'react-table'
import { useProd } from "../../hooks/useProd";
import PaginacaoProd from "./PaginacaoProd";

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

export const ListProd = () => {



  const {handleLista, prods, set_open, set_sprod } = useProd()

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


  const data = useMemo(
    () => prods, [prods]
  )
 
  const columns = useMemo(
    () => header, [header]
  )
  
  const {
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state,
    preGlobalFilteredRows,
    setGlobalFilter

  } = useTable(
      { columns, 
        data,
        initialState: { 
          pageIndex: 0 , 
          pageSize:  9,
         }}, 
      useGlobalFilter, 
      usePagination
  )
 


return(

  <Box sx={{ pt: 3 }}>
    <Grid
      container
      spacing={3}
    >
      {page.map((row) => (
        <Grid
          item
          key={row.original.id}
          lg={4}
          md={6}
          xs={12}
        >
          <ProductCard product={row.original} edit={()=>{
            set_open(true) 
            set_sprod(row.original)
          } } />
        </Grid>
      ))}
    </Grid>

    <PaginacaoProd
        gotoPage = {gotoPage}
        previousPage = {previousPage}
        nextPage = {nextPage}
        canPreviousPage = {canPreviousPage}
        pageIndex = {state.pageIndex}
        pageOptions = {pageOptions}
        pageCount = {pageCount}
        canNextPage = {canNextPage}
      />
  </Box>

  
)}

