import React from "react";

const PatientDetailsTabs = ({ activeTab, handleTabChange }) => {
    return (
        <nav className="nav nav-pills d-flex justify-content-evenly">
            <button
                className={`nav-link text-dark ${activeTab === "details" ? "text-primary border-bottom border-2 border-primary fw-semibold" : "text-muted"}`}
                onClick={() => handleTabChange("details")}
                style={activeTab === "details" ? { borderBottom: "5px solid blue" } : {}}
            >
                Details
            </button>
            <button
                className={`nav-link text-dark ${activeTab === "trends" ? "text-primary border-bottom border-2 border-primary fw-semibold" : "text-muted"}`}
                onClick={() => handleTabChange("trends")}
                style={activeTab === "trends" ? { borderBottom: "3px solid blue" } : {}}
            >
                Trends
            </button>
            <button
                className={`nav-link text-dark ${activeTab === "appointments" ? "text-primary border-bottom border-2 border-primary fw-semibold" : "text-muted"}`}
                onClick={() => handleTabChange("appointments")}
                style={activeTab === "appointments" ? { borderBottom: "3px solid blue" } : {}}
            >
                Appointments
            </button>
            <button
                className={`nav-link text-dark ${activeTab === "medications" ? "text-primary border-bottom border-2 border-primary fw-semibold" : "text-muted"}`}
                onClick={() => handleTabChange("medications")}
                style={activeTab === "medications" ? { borderBottom: "3px solid blue" } : {}}
            >
                Medications
            </button>
            <button
                className={`nav-link text-dark ${activeTab === "team" ? "text-primary border-bottom border-2 border-primary fw-semibold" : "text-muted"}`}
                onClick={() => handleTabChange("team")}
                style={activeTab === "team" ? { borderBottom: "3px solid blue" } : {}}
            >
                Team
            </button>
        </nav>
    );
};

export default PatientDetailsTabs;
