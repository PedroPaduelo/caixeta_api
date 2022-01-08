import React , { useMemo } from 'react';
import { useTable , usePagination, useFilters, useAsyncDebounce, useGlobalFilter} from 'react-table'
import { Box, Fab, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Paginacao from './Paginacao';

export default function TabelaFilter({
  headers,
  rows,
  linePage,
  handleDeleta
}){



  const data = useMemo(
    () => rows, [rows]
  )
 
  const columns = useMemo(
    () => headers, [headers]
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
          pageSize: linePage || 5,
         }}, 
      useGlobalFilter, 
      usePagination
  )
 
  



  
  return (
    <Grid item xs={12}>

      <Table>



        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow key={headerGroup} {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map(column => (
                <TableCell 
                  key={column}  
                  align={column.render('align')}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}   
                </TableCell>
              ))}

            </TableRow>
          ))}
        </TableHead>




        <TableBody>
          {page.map((row,i)  => {
            prepareRow(row)
            return (
              <TableRow key={row} {...row.getRowProps()}>

                <TableCell align="center">
                  {row.original.id}
                </TableCell>

                <TableCell align="left">
                  {row.original.tipo}
                </TableCell>

                <TableCell align="center">
                  {row.original.itens.map((item, i) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {item.quantidade} X {item.descricao_prod}
                    </Box>
                  ))}
                </TableCell>

                <TableCell align="center">
                  {row.original.meio_pagto}
                </TableCell>

                <TableCell align="right">
                  R$ {row.original.preco_final}
                </TableCell>

                <TableCell align="center">
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
                        await handleDeleta(row.original.id)
                      }}
                    >
                      <DeleteForeverIcon />
                    </Fab>
                  </Grid>
                </TableCell>

              </TableRow>
            )
          })}
        </TableBody>
        



      </Table>



      <Paginacao
        gotoPage = {gotoPage}
        previousPage = {previousPage}
        nextPage = {nextPage}
        canPreviousPage = {canPreviousPage}
        pageIndex = {state.pageIndex}
        pageOptions = {pageOptions}
        pageCount = {pageCount}
        canNextPage = {canNextPage}
      />



      
    </Grid>
  );
}