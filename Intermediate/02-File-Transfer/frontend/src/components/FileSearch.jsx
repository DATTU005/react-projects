import React from 'react';

const FileSearch = ({ onSearch }) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="my-4">
            <input
                type="text"
                placeholder="Search files..."
                onChange={handleSearchChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
        </div>
    );
};

export default FileSearch;
