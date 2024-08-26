import React from 'react';

function Paginations({ page, limit, totalCountries, setPage }) {
  const totalPages = Math.ceil(totalCountries / limit);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="paginations">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          className={`paginations ${page === pageNumber ? 'active' : ''}`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
}

export default Paginations;
