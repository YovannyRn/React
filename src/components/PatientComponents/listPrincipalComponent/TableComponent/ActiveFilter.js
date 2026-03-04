import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ActiveFilters = ({ filterConditions, handleRemoveFilter, handleClearAll }) => {
    const activeFilters = Object.keys(filterConditions).filter(key => filterConditions[key]);


    return activeFilters.length > 0 && (
        <Row className="mb-3 p-2" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', alignItems: 'center' }}>
            <Col xs="auto" className="fw-bold text-secondary">
                Filters Active:
            </Col>
            <Col className="d-flex flex-wrap">
                {activeFilters.map((filterKey) => (
                    <div
                        key={filterKey}
                        className="filter-chip mb-2 me-2"
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '20px',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                        onClick={() => handleRemoveFilter(filterKey)}
                    >
                        {`${filterKey}: ${filterConditions[filterKey]}`}
                    </div>
                ))}
            </Col>
            <Col xs="auto">
                <span
                    className="text-danger fw-bold"
                    style={{ cursor: 'pointer' }}
                    onClick={handleClearAll}
                >
                    CLEAR ALL
                </span>
            </Col>
        </Row>
    );
};

export default ActiveFilters;
