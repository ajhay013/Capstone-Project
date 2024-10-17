import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    const [jobSearch, setJobSearch] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Add search logic here
        console.log("Searching for:", jobSearch, "in", location);
    };

    return (
        <Form onSubmit={handleSearch} className="d-flex align-items-center">
        <InputGroup className="me-2 search-bar-input"> {/* Apply custom class */}
            <InputGroup.Text className="pe-2">
               <span className="input-group-text" style={{ border: 'none', background: 'transparent', color: '#0A65CC' }}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
            </InputGroup.Text>
            <Form.Control
                type="text"
                placeholder="Search by: Job title, Position, Keyword..."
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}

            />
        </InputGroup>
        <InputGroup className="me-2 location-input"> {/* Apply custom class */}
            <InputGroup.Text className="pe-2">
                <i className="fas fa-map-marker-alt" />
            </InputGroup.Text>
            <Form.Control
                type="text"
                placeholder="City, state or zip code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
        </InputGroup>
        <Button variant="outline-secondary" className="me-2">
            <i className="fas fa-filter" />
            Filters
        </Button>
        <Button variant="primary" type="submit">Find Job</Button>
    </Form>
    
    );
};

export default SearchBar;
