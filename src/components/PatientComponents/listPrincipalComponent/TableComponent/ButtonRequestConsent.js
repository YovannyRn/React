import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import {FaExclamationTriangle, FaFileAlt} from "react-icons/fa";
import {Button} from "@mui/material";

const RequestButton = () => {
    const [key, setKey] = useState('totalConsent');
    const [panelOpen, setPanelOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);


    const handleOpenPanel = () => {
        setPanelOpen(true);
    };

    const handleClosePanel = (e) => {
        if (e.target === e.currentTarget) {
            setPanelOpen(false);
        }
    };

    const handleGoBack = () => {
        setPanelOpen(false);
    };

    const handleAccept = () => {
        console.log("Consent accepted");
        setPanelOpen(false);
    };

    const [isChecked, setIsChecked] = useState(false);
    const [isCheckedPartial, setIsCheckedPartial] = useState(false);
    const [customTime, setCustomTime] = useState('');
    const [customTimePartial, setCustomTimePartial] = useState('');

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };
    const handleCustomTimeChange = (e) => {
        setCustomTime(e.target.value);
    };

    const handleDurationClick = (duration) => {
        setActiveButton(duration);
    };
    const handleCheckboxChangePartial = (e) => {
        setIsCheckedPartial(e.target.checked);
    };

    return (
        <div>
            <button
                className="btn btn-primary mt-3"
                onClick={handleOpenPanel}
            >
                Request New Consents
            </button>

            {panelOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-index-998"
                    onClick={handleClosePanel}
                />
            )}

            {panelOpen && (
                <div
                    className="patient-details-panel panel-open position-fixed top-0 end-0 w-50 h-100 bg-white shadow-sm p-4 overflow-auto z-index-999"
                >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <button
                            onClick={handleGoBack}
                            className="btn btn-light border border-secondary px-3 py-2 rounded"
                        >
                            Back
                        </button>
                    </div>

                    <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
                        <Nav variant="tabs" className="border-bottom border-secondary">
                            <Nav.Item className="w-50">
                                <Nav.Link
                                    eventKey="totalConsent"
                                    className={`border-0 px-3 py-2 fw-bold text-center ${key === "totalConsent" ? "border-bottom border-3 border-primary" : "text-black"}`}
                                >
                                    Total Consent
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="w-50">
                                <Nav.Link
                                    eventKey="partialConsent"
                                    className={`border-0 px-3 py-2 fw-bold text-center ${key === "partialConsent" ? "border-bottom border-3 border-primary" : "text-black"}`}
                                >
                                    Partial Consent
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content className="p-3">
                            <Tab.Pane eventKey="totalConsent">
                                <div className="alert alert-warning d-flex align-items-center mb-4" role="alert">
                                    <FaExclamationTriangle style={{ fontSize: "24px", marginRight: "10px" }} />
                                    <div className="d-flex justify-content-between w-100">
                                        <div>
                                            <h5 className="mb-1 fw-bold">Request Total Consent</h5>
                                            <p className="mb-0" style={{ fontSize: "14px" }}>
                                                You are requesting full access to Monie Disusa's medical record.
                                            </p>
                                        </div>
                                        <FaFileAlt style={{ fontSize: "24px", color: "#e0a800" }} />
                                    </div>
                                </div>

                                <div className="card bg-light mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Request Total Consent</h5>

                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="requestConsentCheckbox"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label" htmlFor="requestConsentCheckbox">
                                                I agree to the terms and request the total consent.
                                            </label>
                                        </div>

                                        <p className="card-text">
                                            You are requesting full access to Monie Disusa's medical record for a limited time. The patient will set the duration.
                                        </p>
                                    </div>
                                </div>

                                {isChecked && (
                                    <div className="mt-3 d-flex justify-content-start">
                                        {['1 hour', '6 hours', '12 hours', '24 hours', 'custom'].map((duration) => (
                                            <Button
                                                key={duration}
                                                variant={activeButton === duration ? 'primary' : 'outline-primary'}
                                                className="me-2 mb-2"
                                                style={{
                                                    border: '1px solid #007bff',
                                                    color: activeButton === duration ? 'white' : '#007bff',
                                                    backgroundColor: activeButton === duration ? '#007bff' : 'transparent',
                                                }}
                                                onClick={() => handleDurationClick(duration)}
                                            >
                                                {duration === 'custom' ? 'Custom' : duration}
                                            </Button>
                                        ))}
                                    </div>
                                )}

                                {isChecked && activeButton === 'custom' && (
                                    <div className="mt-3">
                                        <label htmlFor="customTimeInput" className="form-label">Enter custom duration (in hours):</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="customTimeInput"
                                            value={customTime}
                                            onChange={handleCustomTimeChange}
                                            placeholder="Enter time in hours"
                                        />
                                    </div>
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="partialConsent">
                                            <h5 className="mb-1 fw-bold">Request Partial  Consent</h5>
                                            <p className="mb-0" style={{ fontSize: "14px" }}>
                                                Choose the medical records you need. The patient will review and aprrove the request
                                            </p>


                                <div className="card bg-light mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Request Total Consent</h5>

                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="requestConsentCheckbox"
                                                checked={isCheckedPartial}
                                                onChange={handleCheckboxChangePartial}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>

                    <button
                        onClick={handleAccept}
                        className="btn btn-primary position-absolute bottom-0 end-0 m-3 px-4 py-2 rounded"
                    >
                        Accept
                    </button>
                </div>
            )}
        </div>
    );
};

export default RequestButton;
