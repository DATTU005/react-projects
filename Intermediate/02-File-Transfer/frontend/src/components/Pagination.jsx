import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => {
    return (
        <div className="flex justify-between mt-4">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-gray-700">Page {page} of {totalPages}</span>
            <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
