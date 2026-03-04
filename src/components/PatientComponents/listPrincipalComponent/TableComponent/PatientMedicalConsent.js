import {FaTimes} from "react-icons/fa";
import RequestButton from "./ButtonRequestConsent";

const PatientMedicalConsent =({setShowPanelMedicalConsent,selectedPatientMedicalConsent,showPanelMedicalConsent}) =>{
    const handleClosePanel = () => {
        setShowPanelMedicalConsent(false);
    };

    if (!selectedPatientMedicalConsent || !showPanelMedicalConsent) return null;
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
                    transition: "transform 0.3s ease",
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
                    <h5 className="ms-2">Medical Consent</h5>
                </div>
                <hr />
                <div className="d-flex align-items-center border rounded-3 p-3" style={{ backgroundColor: "#f9f9f9" }}>
                    <div className="d-flex flex-column align-items-center justify-content-center me-4" style={{ width: "30%" }}>
                        <img
                            src={selectedPatientMedicalConsent?.photo}
                            alt="Patient"
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                    </div>

                    <div className="d-flex flex-column" style={{ width: "70%" }}>
                        <h6 className="fw-bold">{selectedPatientMedicalConsent?.name}</h6>
                        <p className="mb-0" style={{ fontSize: "14px", color: "#555" }}>
                            {selectedPatientMedicalConsent?.email || "vherrero@gcolabora.com"}
                        </p>
                        <p className="mb-0" style={{ fontSize: "14px", color: "#555" }}>
                            {selectedPatientMedicalConsent?.phone }
                        </p>
                    </div>

                    <div className="d-flex flex-column align-items-end" style={{ width: "70%" }}>
                        <h6 className="fw-bold">
                            Insurance: {selectedPatientMedicalConsent?.insurance }
                        </h6>
                    <RequestButton/>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default PatientMedicalConsent;