import { Fab, Grid } from '@mui/material';
import React from 'react';



export default function Paginacao({
  gotoPage, 
  previousPage, 
  nextPage,
  canPreviousPage, 
  pageIndex, 
  pageOptions,
  pageCount,
  canNextPage
}) {


  return (
    <Grid item xs={12}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
        marginBottom: '1rem'

      }}
    >



      <Fab 
        sx={{
          mr: 1
        }}
        size="small" 
        color="secondary" 
        onClick={() => gotoPage(0)} 
        disabled={!canPreviousPage}
      >
        {'<<'}
      </Fab>

      <Fab 
        sx={{
          mr: 2,
        }}
        size="small" 
        color="secondary" 
        onClick={() => previousPage()} 
        disabled={!canPreviousPage}
      >
        {'<'}
      </Fab>


      <span className="pageCurrentPageNext">
        Pagina{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>


      <Fab 
        sx={{
          ml: 2,
        }}
        size="small" 
        color="secondary" 
        onClick={() => nextPage()} 
        disabled={!canNextPage}
      >
        {'>'}
      </Fab>

      <Fab 
        sx={{
          ml: 1,
        }}
        size="small" 
        color="secondary" 
        onClick={() => gotoPage(pageCount - 1)} 
        disabled={!canNextPage}
      >
        {'>>'}
      </Fab>

    </Grid>
  );
}