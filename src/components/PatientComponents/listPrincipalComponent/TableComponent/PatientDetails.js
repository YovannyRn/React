import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import PatientDetailsTabs from "../../Navigation/PatientDetailsTabs";
import DetailsTrend from "./PatientDetailsTrend";

const PatientDetailsPanel = ({ selectedPatientDetails, showPanelDetails, setShowPanelDetails }) => {
    const [activeTab, setActiveTab] = useState("details");
    const handleClosePanel = () => {
        setShowPanelDetails(false);
    };

    if (!selectedPatientDetails || !showPanelDetails) return null;

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="panel-body">
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 9998,
                    pointerEvents: "auto",
                }}
                onClick={handleClosePanel}
            />
            <div
                className={`patient-details-panel panel-open`}
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "50%",
                    height: "100vh",
                    backgroundColor: "#fff",
                    boxShadow: "-5px 0px 10px rgba(0, 0, 0, 0.1)",
                    zIndex: 9999,
                    padding: "20px",
                    overflowY: "auto",
                }}
            >
                <div className="panel-header d-flex align-items-center">
                    <button
                        className="btn-close"
                        onClick={handleClosePanel}
                        aria-label="Close"
                        style={{
                            backgroundColor: "#d3d3d3",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 0,
                        }}
                    >
                        <FaTimes className="text-dark" style={{ fontSize: "24px" }} />
                    </button>
                    <h5 className="ms-2">Details for {selectedPatientDetails.name}</h5>
                </div>
                <hr></hr>
                <PatientDetailsTabs activeTab={activeTab} handleTabChange={handleTabChange} />
                <hr></hr>
                <div className="tab-content">
                    {activeTab === "details" && (
                        <div className="tab-pane fade show active">
                            <form>
                                <section>
                                    <div className="personal-info">
                                        <div className="row mb-3">
                                            <div className="col-12 col-md-4 text-center mb-3">
                                                <img
                                                    src={selectedPatientDetails.photo || "default-image.jpg"}
                                                    alt="Patient"
                                                    className="img-fluid rounded-circle"
                                                    style={{ width: "150px", height: "150px" }}
                                                />
                                            </div>

                                            <div className="col-12 col-md-8">
                                                <div className="row mb-3">
                                                    <div className="col-12 col-md-6 mb-3">
                                                        <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>Name</label>
                                                        <input
                                                            type="text"
                                                            style={{
                                                                backgroundColor: "#F9FAFB"
                                                            }}
                                                            className="form-control"
                                                            value={selectedPatientDetails.name}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-6 mb-3">
                                                        <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>Surname</label>
                                                        <input
                                                            type="text"
                                                            style={{
                                                                backgroundColor: "#F9FAFB"
                                                            }}
                                                            className="form-control"
                                                            value={selectedPatientDetails.surname}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <div className="col-12 col-md-6 mb-3">
                                                        <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>Email</label>
                                                        <input
                                                            type="email"
                                                            style={{
                                                                backgroundColor: "#F9FAFB"
                                                            }}
                                                            className="form-control"
                                                            value={selectedPatientDetails.email}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-6 mb-3">
                                                        <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>Phone Number</label>
                                                        <input
                                                            type="text"
                                                            style={{
                                                                backgroundColor: "#F9FAFB"
                                                            }}
                                                            className="form-control"
                                                            value={selectedPatientDetails.phone}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-12 col-md-3 mb-3">
                                                <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>Gender</label>
                                                <input
                                                    type="text"
                                                    style={{
                                                        backgroundColor: "#F9FAFB"
                                                    }}
                                                    className="form-control"
                                                    value={selectedPatientDetails.gender}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-12 col-md-3 mb-3">
                                                <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>Date of Birth</label>
                                                <input
                                                    type="text"
                                                    style={{
                                                        backgroundColor: "#F9FAFB"
                                                    }}
                                                    className="form-control"
                                                    value={selectedPatientDetails.dob}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-12 col-md-3 mb-3">
                                                <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>Language</label>
                                                <input
                                                    type="text"
                                                    style={{
                                                        backgroundColor: "#F9FAFB"
                                                    }}
                                                    className="form-control"
                                                    value={selectedPatientDetails.language}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-12 col-md-3 mb-3">
                                                <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>City</label>
                                                <input
                                                    type="text"
                                                    style={{
                                                        backgroundColor: "#F9FAFB"
                                                    }}
                                                    className="form-control"
                                                    value={selectedPatientDetails.city}
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-12 col-md-4 mb-3">
                                                <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>Emergency Contact Name</label>
                                                <input
                                                    type="text"
                                                    style={{
                                                        backgroundColor: "#F9FAFB"
                                                    }}
                                                    className="form-control"
                                                    value={selectedPatientDetails.emergencycontactname}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-12 col-md-4 mb-3">
                                                <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>Relation</label>
                                                <input
                                                    type="text"
                                                    style={{
                                                        backgroundColor: "#F9FAFB"
                                                    }}
                                                    className="form-control"
                                                    value={selectedPatientDetails.emergencycontactrelation}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-12 col-md-4 mb-3">
                                                <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>Emergency Contact Number</label>
                                                <input
                                                    type="text"
                                                    style={{
                                                        backgroundColor: "#F9FAFB"
                                                    }}
                                                    className="form-control"
                                                    value={selectedPatientDetails.emergencycontact}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="row mb-3">
                                    <div className="mb-3 col-12 col-md-6">
                                        <label htmlFor="insuranceCompany" className="form-label" style={{ fontWeight: 'bold', color: '#000' }}>Insurance Company</label>
                                        <input
                                            type="text"
                                            style={{
                                                backgroundColor: "#F9FAFB"
                                            }}
                                            className="form-control"
                                            value={selectedPatientDetails.insuranceCompany}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3 col-12 col-md-6">
                                        <label htmlFor="policyNumber" className="form-label" style={{ fontWeight: 'bold', color: '#000' }}>Policy Number</label>
                                        <input
                                            type="text"
                                            style={{
                                                backgroundColor: "#F9FAFB"
                                            }}
                                            className="form-control"
                                            value={selectedPatientDetails.insuranceNumber}
                                            readOnly
                                        />
                                    </div>
                                </section>

                                <section className="row mb-3">
                                    <div className="col-12 col-md-3">
                                        <label htmlFor="Raze/Ethnicity" className="form-label" style={{ fontWeight: 'bold', color: '#000' }}>Raze/Ethnicity</label>
                                        <input
                                            type="text"
                                            style={{
                                                backgroundColor: "#F9FAFB"
                                            }}
                                            className="form-control"
                                            //value={selectedPatientDetails.Raze/Ethnicity}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <label htmlFor="MaritalStatus" className="form-label" style={{ fontWeight: 'bold', color: '#000' }}>Marital Status</label>
                                        <input
                                            type="text"
                                            style={{
                                                backgroundColor: "#F9FAFB"
                                            }}
                                            className="form-control"
                                            // value={selectedPatientDetails.MaritalStatus}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-12 col-md-3">
                                        <label htmlFor="Education" className="form-label" style={{ fontWeight: 'bold', color: '#000' }}>Education Level</label>
                                        <input
                                            type="text"
                                            style={{
                                                backgroundColor: "#F9FAFB"
                                            }}
                                            className="form-control"
                                            value={selectedPatientDetails.position}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <label htmlFor="position" className="form-label" style={{ fontWeight: 'bold', color: '#000' }}>Occupation</label>
                                        <input
                                            type="text"
                                            style={{
                                                backgroundColor: "#F9FAFB"
                                            }}
                                            className="form-control"
                                            value={selectedPatientDetails.position}
                                            readOnly
                                        />
                                    </div>
                                </section>
                                <section className="row mb-3">
                                    <div className="col-12 col-md-3">
                                        <label htmlFor="height" className="form-label" style={{ fontWeight: 'bold', color: '#000' }}>Height</label>
                                        <input
                                            type="number"
                                            style={{
                                                backgroundColor: "#F9FAFB"
                                            }}
                                            className="form-control"
                                            id="height"
                                            name="height"
                                            value={selectedPatientDetails.height}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <label htmlFor="weight" className="form-label" style={{ fontWeight: 'bold', color: '#000' }}>Weight</label>
                                        <input
                                            type="number"
                                            style={{
                                                backgroundColor: "#F9FAFB"
                                            }}
                                            className="form-control"
                                            id="weight"
                                            name="weight"
                                            value={selectedPatientDetails.weight}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 row">
                                        <label htmlFor="Habits" className="form-label" style={{ fontWeight: 'bold', color: '#000' }}>Habits</label>
                                        <div className=" col-12 col-md-4 mt-1">
                                            <label htmlFor="isSmoker" className="form-label">Smoking</label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="isSmoker"
                                                name="isSmoker"
                                                checked={selectedPatientDetails.isSmoker}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-12 col-md-4  mt-1">
                                            <label htmlFor="isAlcoholAddict" className="form-label">Alcohol</label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="isAlcoholAddict"
                                                name="isAlcoholAddict"
                                                checked={selectedPatientDetails.isAlcoholAddict}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-12 col-md-4  mt-1">
                                            <label htmlFor="isDrugAddict" className="form-label">Drug</label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="isDrugAddict"
                                                name="isDrugAddict"
                                                checked={selectedPatientDetails.isDrugAddict}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </section>
                                <section className="address-info">
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label"  style={{ fontWeight: 'bold', color: '#000' }}>address</label>
                                        <input
                                            type="text"
                                            style={{
                                                backgroundColor: "#F9FAFB"
                                            }}
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            value={selectedPatientDetails.address}
                                            readOnly
                                        />
                                    </div>

                                </section>

                                <section className="additional-info">
                                    <div className="mb-3">
                                        <label htmlFor="about" className="form-label"  style={{ fontWeight: 'bold', color: '#000' }}>about</label>
                                        <textarea
                                            className="form-control"
                                            style={{
                                                backgroundColor: "#F9FAFB"
                                            }}
                                            id="about"
                                            name="about"
                                            value={selectedPatientDetails.about}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="summary" className="form-label"  style={{ fontWeight: 'bold', color: '#000' }}>summary</label>
                                        <textarea
                                            className="form-control"
                                            style={{
                                                backgroundColor: "#F9FAFB"
                                            }}
                                            id="summary"
                                            name="summary"
                                            value={selectedPatientDetails.summary}
                                            readOnly
                                        />
                                    </div>
                                </section>
                            </form>
                        </div>
                    )}
                    {activeTab === "trends" && (
                        <DetailsTrend/>
                        )}
                </div>
            </div>
        </div>
    );
};

export default PatientDetailsPanel;
