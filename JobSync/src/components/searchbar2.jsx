import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon from react-icons

export default function SearchBar2({ placeholder, onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (event) => {
        setSearchText(event.target.value);
        if (onSearch) {
            onSearch(event.target.value);
        }
    };

    return (
        <div className="input-group mb-3" style={{ width: '100%' }}>
            <input
                type="text"
                className="form-control"
                placeholder={placeholder || "Search..."}
                value={searchText}
                onChange={handleSearch}
                style={{ borderRadius: '10px 0 0 10px' }} 
            />
            <div className="input-group-append">
                <button className="btn btn-primary" type="button" onClick={() => onSearch(searchText)} style={{ borderRadius: '0 10px 10px 0' }}>
                    <FaSearch style={{ color: '#fff' }} />
                </button>
            </div>
        </div>
    );
}
