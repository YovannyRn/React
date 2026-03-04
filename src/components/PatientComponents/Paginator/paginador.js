import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const generatePageNumbers = () => {
        const pages = [];
        pages.push(1);

        const leftSiblingIndex = Math.max(2, currentPage - 1);
        const rightSiblingIndex = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage > 3) {
            pages.push('...');
        }

        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
            if (i > 1 && i < totalPages) {
                pages.push(i);
            }
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <nav aria-label="Patient pagination">
            <ul className="pagination justify-content-center align-items-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ←
                    </button>
                </li>

                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <li key={`ellipsis-${index}`} className="page-item">
                                <span className="page-link">...</span>
                            </li>
                        );
                    }

                    return (
                        <li
                            key={page}
                            className={`page-item ${page === currentPage ? 'active' : ''}`}
                        >
                            <button
                                className={`page-link ${page === currentPage ? 'bg-primary text-white' : ''}`}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        →
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
