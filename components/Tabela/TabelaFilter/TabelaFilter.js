import React , { useMemo } from 'react';
import { useTable , usePagination, useFilters, useAsyncDebounce, useGlobalFilter} from 'react-table'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paginacao from '../Paginacao/Paginacao';
import TargetStatusAtivo from '../../Targuet/TargetStatusAtivo';
import GlobalFilter from './FiltroGlobal/TabelaCelulas';
import ModalEditUser from './Modal/ModalEditUser';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    marginBottom: "20px"
  },  
  TableCellDisplay:{
    border: `1px solid ${theme.palette.divider}`
  },
}));


export default function TabelaFilter({
  ariaLabel,
  size,
  headers,
  rows,
  linePage
}){


  const classes = useStyles();

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
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        useAsyncDebounce={useAsyncDebounce}
      />

      <Table 
        className={classes.table} 
        size={size || 'small'} 
        aria-label={ariaLabel}
      >

        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow key={headerGroup} {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map(column => (
                <TableCell 
                  key={column}  
                  align={column.render('align')}
                  className={classes.TableCellDisplay}
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

                <TableCell align="center" className={classes.TableCellDisplay}>
                  {row.id}
                </TableCell>

                <TableCell align="left" className={classes.TableCellDisplay}>
                  {row.original.fistname} {row.original.lastname}
                </TableCell>

                <TableCell align="center" className={classes.TableCellDisplay}>
                  {row.original.created_at}
                </TableCell>

                <TableCell align="center" className={classes.TableCellDisplay}>
                  {row.original.updated_at}
                </TableCell>

                <TableCell align="center" className={classes.TableCellDisplay}>
                  <TargetStatusAtivo targuet={row.original.descstatus} />
                </TableCell>

                <TableCell align="center" className={classes.TableCellDisplay}>
                  <ModalEditUser dados={row.original} />
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

    </>
  );
}