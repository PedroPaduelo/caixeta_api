import { ProductCard } from "./product-card";
import { Box, Card, CardContent, Grid } from '@mui/material';
import { useContext, useEffect, useMemo } from "react";
import { useTable , usePagination,useFilters, useAsyncDebounce, useGlobalFilter} from 'react-table'
import PaginacaoProd from "./PaginacaoProd";
import FiltroCat from "./FiltroGlobal/FiltroCat";
import { ProdContext } from "../../Context/ProdsContext";
import FiltroMarca from "./FiltroGlobal/FiltroMarca";
import FiltroDescri from "./FiltroGlobal/FiltroDescri";


const header = [
  {
    Header: 'ID',
    accessor: 'id',
    align: "left",
  },

  {
    Header: 'descricao_prod',
    accessor: 'descricao_prod',
    align: "left"
  },

  {
    Header: 'codigo_de_barras',
    accessor: 'codigo_de_barras',
    align: "left",
  },

  {
    Header: 'categorias',
    accessor: 'categorias',
    align: "center",
  },

  {
    Header: 'marca',
    accessor: 'marca',
    align: "right",
  },




  {
    Header: 'preco_de_custo',
    accessor: 'preco_de_custo',
    align: "right",
  },

  {
    Header: 'preco_de_venda',
    accessor: 'preco_de_venda',
    align: "right",
  },

  {
    Header: 'unidade',
    accessor: 'unidade',
    align: "right",
  },

  {
    Header: 'fornecedor',
    accessor: 'fornecedor',
    align: "right",
  },

  {
    Header: 'qtd_em_estoque',
    accessor: 'qtd_em_estoque',
    align: "right",
  },

  {
    Header: 'qtd_estoque_min',
    accessor: 'qtd_estoque_min',
    align: "right",
  },

  {
    Header: 'qtd_estoque_max',
    accessor: 'qtd_estoque_max',
    align: "right",
  },

  {
    Header: 'status',
    accessor: 'status',
    align: "right",
  },

  {
    Header: 'promocao',
    accessor: 'promocao',
    align: "right",
  },

  {
    Header: 'markup',
    accessor: 'markup',
    align: "right",
  }
]

export const ListProd = () => {

  const { 
    handleLista, 
    prods, 
    set_open, 
    set_sprod,
    handleListaByCol


  } = useContext(ProdContext);


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
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state,    
  } = useTable(
      { columns, 
        data,
        initialState: { 
          pageIndex: 0 , 
          pageSize:  9,
         }
      }, 
      useFilters,
      useGlobalFilter,
      usePagination
  )
 



return(

  <Box sx={{ pt: 3 }}>


    <Box sx={{ mb: 3 }}>
      <Card>
        <CardContent>

          <Grid
            container
            spacing={2}
          >

            <FiltroDescri
              onChange={handleListaByCol}
            />

            <FiltroMarca
              onChange={handleListaByCol}
            />

            <FiltroCat
              onChange={handleListaByCol}
            />

          </Grid>
          
        </CardContent>
      </Card>
    </Box>



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

