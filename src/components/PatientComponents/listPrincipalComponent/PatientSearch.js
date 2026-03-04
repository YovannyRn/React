import React from 'react';

const SearchInput = ({ searchTerm, setSearchTerm }) => {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search patients..."
            className="form-control"
        />
    );
};

export default SearchInput;