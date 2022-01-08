import React , { useMemo } from 'react';
import { useTable , usePagination } from 'react-table'
import { makeStyles } from '@material-ui/core/styles';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paginacao from './Paginacao';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 450,
    marginBottom: "10px",
    justifyContent: "start"
  },  
  TableCellDisplay:{
    border: `1px solid ${theme.palette.divider}`,
  },
}));



export default function TabelaPaginada({
    ariaLabel,
    size,
    headers,
    headerHides,
    rows,
    linePage
  }){

  const classes = useStyles();



  const data = useMemo(
    () => rows || [], [rows]
  )
 
  const columns = useMemo(
    () => headers, [headers]
  )


  const defaultColumn = {
  }



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
    getTableProps,
    state,
    
  } = useTable(
    { 
      
      columns, 
      data,

      defaultColumn, 

      initialState: { 
        pageIndex: 0 , 
        pageSize: linePage || 5,
        hiddenColumns: headerHides || []
      }

    }, 

    usePagination)

  
  return (
    <>
    

      <Table 
        className={classes.table} 
        size={size || 'small'} 
        aria-label={ariaLabel}
        {...getTableProps()}
        
      >


        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow key={headerGroup} {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map(column => (
                <TableCell 
                  key={column}  
                  align={column.render('align')}
                  style={{
                    minWidth: column.render('width')
                  }}

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
                {row.cells.map(cell => {
                  return (
                    <TableCell 
                      align={cell.column.align}
                      className={classes.TableCellDisplay}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                    )
                })}
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