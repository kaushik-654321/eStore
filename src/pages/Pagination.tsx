import React from 'react';
import './style.css';

type PagenationProps = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PagenationProps> = ({
    totalItems, itemsPerPage, currentPage, onPageChange
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    if (totalPages < 1) return null;
    return (
        <div className="pagination d-flex justify-content-center mt-5">
            <button
                className="rounded"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                &laquo;
            </button>
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`rounded ${currentPage === page ? "active" : ""}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className="rounded"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                &raquo;
            </button>
        </div>
    )
}

export default Pagination;