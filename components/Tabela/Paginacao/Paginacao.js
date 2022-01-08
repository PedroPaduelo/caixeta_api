import React from 'react';

import './Ranking.css'


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
    <div className="pagination">

      <button className="pageNavigationButton" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </button>

      <button className="pageNavigationButton" onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>


      <span className="pageCurrentPageNext">
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>


      <button className="pageNavigationButton" onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>

      <button className="pageNavigationButton" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </button>

    </div>
  );
}