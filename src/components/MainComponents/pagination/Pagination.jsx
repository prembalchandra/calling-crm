// src/components/Pagination.jsx
import React from 'react';
import './Pagination.css'; // Make sure this file is present

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPageButtons = 10;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = startPage + maxPageButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container d-flex justify-content-between mt-3 align-items-center">
      <div className="">
        Page {currentPage} of {totalPages}
      </div>

      <div className="pagination d-flex justify-content-end">
        <nav>
          <ul className="pagination mb-0 gap-2">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className=" Previous-btn next-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {startPage > 1 && (
              <>
                <li className="page-item">
                  <button className="page-link" onClick={() => onPageChange(1)}>1</button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              </>
            )}

            {pageNumbers.map((page) => (
              <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </button>
              </li>
            ))}

            {endPage < totalPages && (
              <>
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
                <li className="page-item">
                  <button className="page-link" onClick={() => onPageChange(totalPages)}>
                    {totalPages}
                  </button>
                </li>
              </>
            )}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className={`next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
