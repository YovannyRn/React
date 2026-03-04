import React from "react";
import { FaUsers, FaMale, FaFemale, FaPlusCircle, FaCheckCircle } from "react-icons/fa";

const PatientKPIs = ({ patients, showKPIs }) => {
    const totalPatients = patients.length;
    const males = patients.filter(patient => patient.gender === "male").length;
    const females = patients.filter(patient => patient.gender === "female").length;

    const newPatients = patients.filter(patient => {
        if (!patient.registrationDate) return false;
        const registrationDate = new Date(patient.registrationDate);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return registrationDate >= oneMonthAgo;
    }).length;

    const solvedPatients = patients.filter(patient => patient.medicalHistory && patient.medicalHistory.solved).length;

    if (!showKPIs) return null;

    return (
        <div className="d-flex">
            <div className="card shadow-sm d-flex flex-row align-items-center p-2" style={{ width: "90px", height: "60px", marginRight: "5px" }}>
                <FaUsers size={24} />
                <div className="ms-auto text-end">
                    <h6 className="mb-0" style={{ fontSize: "12px" }}>Total</h6>
                    <p className="mb-0" style={{ fontSize: "14px" }}>{totalPatients}</p>
                </div>
            </div>

            <div className="card shadow-sm d-flex flex-row align-items-center p-2" style={{ width: "90px", height: "60px", marginRight: "5px" }}>
                <FaMale size={24} />
                <div className="ms-auto text-end">
                    <h6 className="mb-0" style={{ fontSize: "12px" }}>Males</h6>
                    <p className="mb-0" style={{ fontSize: "14px" }}>{males}</p>
                </div>
            </div>

            <div className="card shadow-sm d-flex flex-row align-items-center p-2" style={{ width: "90px", height: "60px", marginRight: "5px" }}>
                <FaFemale size={24} />
                <div className="ms-auto text-end">
                    <h6 className="mb-0" style={{ fontSize: "12px" }}>Females</h6>
                    <p className="mb-0" style={{ fontSize: "14px" }}>{females}</p>
                </div>
            </div>

            <div className="card shadow-sm d-flex flex-row align-items-center p-2" style={{ width: "90px", height: "60px", marginRight: "5px" }}>
                <FaPlusCircle size={24} />
                <div className="ms-auto text-end">
                    <h6 className="mb-0" style={{ fontSize: "12px" }}>New</h6>
                    <p className="mb-0" style={{ fontSize: "14px" }}>{newPatients}</p>
                </div>
            </div>

            <div className="card shadow-sm d-flex flex-row align-items-center p-2" style={{ width: "90px", height: "60px" }}>
                <FaCheckCircle size={24} />
                <div className="ms-auto text-end">
                    <h6 className="mb-0" style={{ fontSize: "12px" }}>Solved</h6>
                    <p className="mb-0" style={{ fontSize: "14px" }}>{solvedPatients}</p>
                </div>
            </div>
        </div>

    );
};

export default PatientKPIs;
