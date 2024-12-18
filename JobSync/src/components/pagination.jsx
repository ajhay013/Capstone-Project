import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    const startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      )
    );
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const pageNumbers = getPageNumbers();

  // Function to format page numbers with leading zero
  const formatPageNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  return (
    <nav aria-label="Page navigation" className="mt-4">
      <ul className="pagination justify-content-center">
        {/* Left Arrow */}
        <li
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          style={{
            borderRadius: '50%',
            margin: '0 5px',
            padding: '7px 15px',
            cursor: currentPage === 1 ? 'default' : 'pointer',
          }}
        >
          <button
            className="page-link"
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            style={{
              backgroundColor: currentPage === 1 ? 'transparent' : '#ebebebc2',
              color: currentPage === 1 ? 'transparent' : '#0A65CC',
              borderColor: currentPage === 1 ? 'transparent' : '#dee2e6',
              borderRadius: '50%',
              fontWeight: 'bold',
              padding: '10px 15px',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            <FaArrowLeft style={{ marginTop: '-3px' }} />
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
            style={{
              borderRadius: '50%',
              margin: '0 5px',
              cursor: 'pointer',
            }}
          >
            <button
              className="page-link"
              onClick={() => paginate(number)}
              style={{
                backgroundColor: currentPage === number ? '#0A65CC' : 'white',
                color: currentPage === number ? 'white' : 'black',
                borderRadius: '50%',
                fontWeight: 'bold',
                padding: '8px 11px',
                transition: 'background-color 0.3s, color 0.3s',
              }}
            >
              {formatPageNumber(number)} {/* Display page number with leading zero */}
            </button>
          </li>
        ))}

        {/* Right Arrow */}
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          style={{
            borderRadius: '50%',
            margin: '0 5px',
            padding: '7px 15px',
            cursor: currentPage === totalPages ? 'default' : 'pointer',
          }}
        >
          <button
            className="page-link"
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            style={{
              backgroundColor: currentPage === totalPages ? 'transparent' : '#ebebebc2',
              color: currentPage === totalPages ? 'transparent' : '#0A65CC',
              borderColor: currentPage === totalPages ? 'transparent' : '#dee2e6',
              borderRadius: '50%',
              fontWeight: 'bold',
              padding: '10px 15px',
              transition: 'color 0.3s',
            }}
          >
            <FaArrowRight style={{ marginTop: '-3px' }} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
