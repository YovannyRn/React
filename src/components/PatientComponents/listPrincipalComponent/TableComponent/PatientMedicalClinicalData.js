import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import conditionsData from "../../../../data/conditions.json";
import ageData from "../../../../data/age.json";
import relationData from "../../../../data/relation.json";
import resultData from "../../../../data/resultsOptions.json";
import severitiesData from "../../../../data/severities.json";
import allergiesData from "../../../../data/allergyOptions.json";
import treatmentData from "../../../../data/treatmentPlans.json";
import ModalComponent from "./ButtonAddOther";
import allergyOptionsData from "../../../../data/allergyOptions.json";

const PatientMedicalClinicalData = ({ selectedPatientMedical, showPanelMedical, setShowPanelMedical }) => {

    const [nameCondition, setNameCondition] = useState("");
    const [diagnosisDateCondition, setDiagnosisDateCondition] = useState("");
    const [severitySelectCondition, setSeveritySelectCondition] = useState("");
    const [treatmentPlanSelectCondition, setTreatmentPlanSelectCondition] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [nameMedicalHistory, setNameMedicalHistory] = useState("");
    const [diagnosisDateMedicalHistory, setDiagnosisDateMedicalHistory] = useState("");
    const [outcomesMedicalHistory, setOutcomesMedicalHistory] = useState("");
    const [allergiesSelectMedicalHistory, setAllergiesSelectMedicalHistory] = useState("");
    const [nameFamilyHistory, setNameFamilyHistory] = useState("");
    const [relationshiptoPatient, setRelationshiptoPatient] = useState("");
    const [ageOnset, setAgeOnset] = useState("");
    const [nameMedication, setNameMedication] = useState("");
    const [dosageMedication, setDosageMedication] = useState("");
    const [reasonMedication, setReasonMedication] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("");
    const [diagnosisDate, setDiagnosisDate] = useState("");
    const [refill, setRefill] = useState("");
    const [heightVital, setHeightVital] = useState("");
    const [weightVital, setWeightVital] = useState("");
    const [bloodPressureVital, setBloodPressureVital] = useState("");
    const [BMIVital, setBMIVital] = useState("");
    const [heartRateVital, setHeartRateVital] = useState("");
    const [respiratoryRate, setRespiratoryRate] = useState("");
    const [temperatureVital, setTemperatureVital] = useState("");
    const [typeLab, setTypeLab] = useState("");
    const [dateTestLab, setDateTestLab] = useState("");
    const [resultsLab, setResultsLab] = useState("");
    const [dateVitals, setDateVitals] = useState("");
    const [timeOfRecording, setTimeOfRecording] = useState("");
    const [recordingMethod, setRecordingMethod] = useState("");
    const [allergies, setAllergies] = useState("");
    const [severityReaction, setSeverityReaction] = useState("");
    const [dateLastReason, setDateLastReason] = useState("");

    const [modalData, setModalData] = useState({
        modal1: null,
        modal2: null,
        modal3: null,
        modal4: null,
        modal5: null,
        modal6: null,
    });

    const handleSaveModalData = (data, modalId) => {
        setModalData(prevState => ({
            ...prevState,
            [modalId]: data,
        }));
    };

    const handleFileChangeCurrents = (e) => {
        setSelectedFiles((prevFiles) => [...prevFiles, ...e.target.files]);
    };const handleFileChangeLabResult = (e) => {
        setSelectedFiles((prevFiles) => [...prevFiles, ...e.target.files]);
    };
    const handleDeleteFile = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };


    const handleClosePanel = () => {
        setShowPanelMedical(false);
    };

    if (!selectedPatientMedical || !showPanelMedical) return null;

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("condition", nameCondition);
        formData.append("diagnosisDate", diagnosisDateCondition);
        formData.append("severity", severitySelectCondition);
        formData.append("treatmentPlan", treatmentPlanSelectCondition);
        selectedFiles.forEach((file) => formData.append("files", file));
        formData.append("nameMedicalHistory", nameMedicalHistory);
        formData.append("diagnosisDateMedicalHistory", diagnosisDateMedicalHistory);
        formData.append("outcomesMedicalHistory", outcomesMedicalHistory);
        formData.append("allergy", allergiesSelectMedicalHistory);
        formData.append("nameFamilyHistory", nameFamilyHistory);
        formData.append("relationshiptoPatient", relationshiptoPatient);
        formData.append("ageOnset", ageOnset);
        formData.append("nameMedication", nameMedication);
        formData.append("dosageMedication", dosageMedication);
        formData.append("reasonMedication", reasonMedication);
        formData.append("prescribingDoctor", selectedCondition);
        formData.append("startDate", diagnosisDate);
        formData.append("refillInformation", refill);
        formData.append("heightVital", heightVital);
        formData.append("weightVital", weightVital);
        formData.append("bloodPressureVital", bloodPressureVital);
        formData.append("BMIVital", BMIVital);
        formData.append("heartRateVital", heartRateVital);
        formData.append("respiratoryRate", respiratoryRate);
        formData.append("temperatureVital", temperatureVital);
        formData.append("typeLab", typeLab);
        formData.append("dateTestLab", dateTestLab);
        formData.append("resultsLab", resultsLab);
        formData.append("dateVital", dateVitals);
        formData.append("timeOfRecording", timeOfRecording);
        formData.append("recordingMethod", recordingMethod);

        console.log("Enviando datos a la API...", {
            nameCondition,
            diagnosisDateCondition,
            severitySelectCondition,
            treatmentPlanSelectCondition,
            selectedFiles
        });

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
                    zIndex: 9990,
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
                    <h5 className="ms-2">Patient Medical and Clinical Data for {selectedPatientMedical.name}</h5>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                <section className="container mt-4 border p-3 rounded">
                    <h2>Current Conditions</h2>
                    <hr></hr>
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <label className="mb-2" htmlFor="nameCondition" style={{ fontWeight: 'bold', color: '#000' }}>
                                Condition Name
                            </label>
                            <select
                                id="nameCondition"
                                className="form-select"
                                value={nameCondition}
                                onChange={(e) => setNameCondition(e.target.value)}
                            >
                                <option value="">Select Condition</option>
                                {conditionsData.conditions.map((condition) => (
                                    <option key={condition.id} value={condition.id}>
                                        {condition.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="mb-2" htmlFor="diagnosisDateCondition" style={{ fontWeight: 'bold', color: '#000' }}>
                                Date of Diagnosis
                            </label>
                            <input
                                type="date"
                                id="diagnosisDateCondition"
                                className="form-control"
                                value={diagnosisDateCondition}
                                onChange={(e) => setDiagnosisDateCondition(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="mb-2" htmlFor="severitySelectCondition" style={{ fontWeight: 'bold', color: '#000' }}>
                                Severity
                            </label>
                            <select
                                id="severitySelectCondition"
                                className="form-select"
                                value={severitySelectCondition}
                                onChange={(e) => setSeveritySelectCondition(e.target.value)}
                            >
                                <option value="">Select Severity</option>
                                {severitiesData.severities.map((severity) => (
                                    <option key={severity.id} value={severity.id}>
                                        {severity.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="mb-2" htmlFor="treatmentPlanSelectCondition" style={{ fontWeight: 'bold', color: '#000' }}>
                                Treatment Plan
                            </label>
                            <select
                                id="treatmentPlanSelectCondition"
                                className="form-select"
                                value={treatmentPlanSelectCondition}
                                onChange={(e) => setTreatmentPlanSelectCondition(e.target.value)}
                            >
                                <option value="">Select Treatment Plan</option>
                                {treatmentData.treatmentPlans.map((plan) => (
                                    <option key={plan.value} value={plan.value}>
                                        {plan.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row align-items-start">
                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="fileUploadCondition" style={{ fontWeight: 'bold', color: '#000' }}>
                                Medical Records or Documents
                            </label>
                            <input
                                type="file"
                                id="fileUploadCondition"
                                className="form-control"
                                multiple
                                accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                                onChange={handleFileChangeCurrents}
                            />
                        </div>

                        <div className="col-md-8 d-flex flex-wrap gap-3">
                            {selectedFiles.length > 0 && (
                                selectedFiles.map((file, index) => (
                                    <div key={index} className="card p-3" style={{ width: "150px", textAlign: "center", position: "relative" }}>
                                        {/* Botón de eliminar */}
                                        <button
                                            type="button"
                                            className="btn btn-sm position-absolute top-0 end-0 m-1"
                                            onClick={() => handleDeleteFile(index)}
                                            style={{
                                                color: "red",
                                                backgroundColor: "transparent",
                                                border: "1px solid red",
                                                borderRadius: "50%",
                                                padding: "0.2rem 0.4rem",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            X
                                        </button>

                                        <div className="file-icon mb-2">
                                            {file.type.includes("image") ? (
                                                <img src="/path/to/image-icon.png" alt="Image" style={{ width: "30px", height: "30px" }} />
                                            ) : file.type === "application/pdf" ? (
                                                <img src="/path/to/pdf-icon.png" alt="PDF" style={{ width: "30px", height: "30px" }} />
                                            ) : file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                                <img src="/path/to/word-icon.png" alt="Word" style={{ width: "30px", height: "30px" }} />
                                            ) : (
                                                <img src="/path/to/file-icon.png" alt="File" style={{ width: "30px", height: "30px" }} />
                                            )}
                                        </div>

                                        <small>{file.name}</small>

                                        <div className="mt-2">
                                            <small>{(file.size / 1024).toFixed(2)} KB</small>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="w-25 mt-3">
                            <ModalComponent onSave={handleSaveModalData} modalId="modal1" />
                        </div>
                        {modalData.modal1 && (
                            <div className="col-md-4 mt-3">
                                <div className="border p-3 rounded position-relative">
                                    <button
                                        type="button"
                                        className="btn-close position-absolute top-0 end-0"
                                        aria-label="Close"
                                        onClick={() => setModalData(prevState => ({ ...prevState, modal1: null }))}
                                    ></button>
                                    <p><strong>Date:</strong> {modalData.modal1.date}</p>
                                    <p><strong>Start Time:</strong> {modalData.modal1.startTime}</p>
                                    <p><strong>End Time:</strong> {modalData.modal1.endTime}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="container mt-4 border p-3 rounded">
                    <div className="row mb-3">
                        <h2>Past Medical History</h2>
                        {/* Name Input */}
                        <div className="col-md-3">
                            <label className="mb-2" htmlFor="nameMedicalHistory" style={{ fontWeight: 'bold', color: '#000' }}>
                                Name
                            </label>
                            <input
                                type="text"
                                id="nameMedicalHistory"
                                className="form-control"
                                value={nameMedicalHistory}
                                onChange={(e) => setNameMedicalHistory(e.target.value)}
                            />
                        </div>

                        {/* Date of Diagnosis */}
                        <div className="col-md-3">
                            <label className="mb-2" htmlFor="diagnosisDateMedicalHistory" style={{ fontWeight: 'bold', color: '#000' }}>
                                Dates
                            </label>
                            <input
                                type="date"
                                id="diagnosisDateMedicalHistory"
                                className="form-control"
                                value={diagnosisDateMedicalHistory}
                                onChange={(e) => setDiagnosisDateMedicalHistory(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="mb-2" htmlFor="outcomesMedicalHistory" style={{ fontWeight: 'bold', color: '#000' }}>
                                Outcomes
                            </label>
                            <input
                                type="text"
                                id="outcomesMedicalHistory"
                                className="form-control"
                                value={outcomesMedicalHistory}
                                onChange={(e) => setOutcomesMedicalHistory(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="mb-2" htmlFor="allergiesSelectMedicalHistory" style={{ fontWeight: 'bold', color: '#000' }}>
                                Allergies
                            </label>
                            <select
                                id="allergiesSelectMedicalHistory"
                                className="form-select"
                                value={allergiesSelectMedicalHistory}
                                onChange={(e) => setAllergiesSelectMedicalHistory(e.target.value)}
                            >
                                <option value="">Select Allergy</option>
                                {allergiesData.allergyOptions.map((allergy) => (
                                    <option key={allergy.value} value={allergy.value}>
                                        {allergy.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-25 mt-3">
                            <ModalComponent onSave={handleSaveModalData} modalId="modal2" />
                        </div>
                        {modalData.modal2 && (
                            <div className="col-md-4 mt-3">
                                <div className="border p-3 rounded position-relative">
                                    <button
                                        type="button"
                                        className="btn-close position-absolute top-0 end-0"
                                        aria-label="Close"
                                        onClick={() => setModalData(prevState => ({ ...prevState, modal2: null }))}
                                    ></button>
                                    <p><strong>Date:</strong> {modalData.modal2.date}</p>
                                    <p><strong>Start Time:</strong> {modalData.modal2.startTime}</p>
                                    <p><strong>End Time:</strong> {modalData.modal2.endTime}</p>
                                </div>
                            </div>
                        )}

                    </div>
                </section>

                <section className="container mt-4 border p-3 rounded">
                    <div className="row mb-3">
                        <h2>Family History</h2>
                        {/* Name Input */}
                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="nameFamilyHistory" style={{ fontWeight: 'bold', color: '#000' }}>
                                Name
                            </label>
                            <input
                                type="text"
                                id="nameFamilyHistory"
                                className="form-control"
                                value={nameFamilyHistory}
                                onChange={(e) => setNameFamilyHistory(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="relationshiptoPatient" style={{ fontWeight: 'bold', color: '#000' }}>
                                Relationship to Patient
                            </label>
                            <select
                                id="relationshiptoPatient"
                                className="form-select"
                                value={relationshiptoPatient}
                                onChange={(e) => setRelationshiptoPatient(e.target.value)}
                            >
                                <option value="">Select Allergy</option>
                                {relationData.relation.map((relation) => (
                                    <option key={relation.id} value={relation.id}>
                                        {relation.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="ageOnset" style={{ fontWeight: 'bold', color: '#000' }}>
                                Age of Onset
                            </label>
                            <select
                                id="ageOnset"
                                className="form-select"
                                value={ageOnset}
                                onChange={(e) => setAgeOnset(e.target.value)}
                            >
                                <option value="">Select Allergy</option>
                                {ageData.age.map((age) => (
                                    <option key={age.id} value={age.id}>
                                        {age.name}
                                    </option>
                                    ))}
                                </select>
                        </div>
                        <div className="w-25 mt-3">
                            <ModalComponent onSave={handleSaveModalData} modalId="modal3" />
                        </div>
                        {modalData.modal3 && (
                            <div className="col-md-4 mt-3">
                                <div className="border p-3 rounded position-relative">
                                    <button
                                        type="button"
                                        className="btn-close position-absolute top-0 end-0"
                                        aria-label="Close"
                                        onClick={() => setModalData(prevState => ({ ...prevState, modal3: null }))}
                                    ></button>
                                    <p><strong>Date:</strong> {modalData.modal3.date}</p>
                                    <p><strong>Start Time:</strong> {modalData.modal3.startTime}</p>
                                    <p><strong>End Time:</strong> {modalData.modal3.endTime}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>


                <section className="container mt-4 border p-3 rounded">
                    <div className="row mb-3">
                        <h2>Medications</h2>
                        {/* Name Input */}
                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="nameMedication" style={{ fontWeight: 'bold', color: '#000' }}>
                                Name
                            </label>
                            <input
                                type="text"
                                id="nameMedication"
                                className="form-control"
                                value={nameMedication}
                                onChange={(e) => setNameMedication(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="dosageMedication" style={{ fontWeight: 'bold', color: '#000' }}>
                               Dosage
                            </label>
                                <input
                                    type="text"
                                    id="dosageMedication"
                                    className="form-control"
                                    value={dosageMedication}
                                    onChange={(e) => setDosageMedication(e.target.value)}
                                />
                        </div>


                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="reasonMedication" style={{ fontWeight: 'bold', color: '#000' }}>
                                Reason
                            </label>
                            <input
                                type="text"
                                id="reasonMedication"
                                className="form-control"
                                value={reasonMedication}
                                onChange={(e) => setReasonMedication(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="prescribingDoctor" style={{ fontWeight: 'bold', color: '#000' }}>
                                Prescribing Doctor
                            </label>
                            <input
                                type="text"
                                id="conditionSelect"
                                className="form-control"
                                value={selectedCondition}
                                onChange={(e) => setSelectedCondition(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="diagnosisDate" style={{ fontWeight: 'bold', color: '#000' }}>
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="diagnosisDate"
                                className="form-control"
                                value={diagnosisDate}
                                onChange={(e) => setDiagnosisDate(e.target.value)}
                            />
                        </div>


                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="refill" style={{ fontWeight: 'bold', color: '#000' }}>
                                Refill Information
                            </label>
                            <input
                                type="text"
                                id="refill"
                                className="form-control"
                                value={refill}
                                onChange={(e) => setRefill(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-25 mt-3">
                        <ModalComponent onSave={handleSaveModalData} modalId="modal4" />
                    </div>
                    {modalData.modal4 && (
                        <div className="col-md-4 mt-3">
                            <div className="border p-3 rounded position-relative">
                                <button
                                    type="button"
                                    className="btn-close position-absolute top-0 end-0"
                                    aria-label="Close"
                                    onClick={() => setModalData(prevState => ({ ...prevState, modal4: null }))}
                                ></button>
                                <p><strong>Date:</strong> {modalData.modal4.date}</p>
                                <p><strong>Start Time:</strong> {modalData.modal4.startTime}</p>
                                <p><strong>End Time:</strong> {modalData.modal4.endTime}</p>
                            </div>
                        </div>
                    )}

                </section>
                <section className="container mt-4 border p-3 rounded">
                    <div className="row mb-3">
                        <h2> Vitals </h2>
                        <div className="col-md-4 ">
                            <label className="mb-2" htmlFor="heightVital" style={{ fontWeight: 'bold', color: '#000' }}>
                                Height
                            </label>
                            <input type="text"
                                   id="heightVital"
                                   className="form-control"
                                   value={heightVital}
                                   onChange={(e)=> setHeightVital(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 ">
                            <label className="mb-2" htmlFor="weightVital" style={{ fontWeight: 'bold', color: '#000' }}>
                                Weight
                            </label>
                            <input type="text"
                                   id="weightVital"
                                   className="form-control"
                                   value={weightVital}
                                   onChange={(e)=> setWeightVital(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 ">
                            <label className="mb-2" htmlFor="bloodPressureVital" style={{ fontWeight: 'bold', color: '#000' }}>
                                Blood Pressure
                            </label>
                            <input type="text"
                                   id="bloodPressureVital"
                                   className="form-control"
                                   value={bloodPressureVital}
                                   onChange={(e)=> setBloodPressureVital(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-3">
                            <label className="mb-2" htmlFor="BMIVital" style={{ fontWeight: 'bold', color: '#000' }}>
                                BMI
                            </label>
                            <input type="text"
                                   id="BMIVital"
                                   className="form-control"
                                   value={BMIVital}
                                   onChange={(e)=> setBMIVital(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="mb-2" htmlFor="heartRateVital" style={{ fontWeight: 'bold', color: '#000' }}>
                                Heart Rate
                            </label>
                            <input type="text"
                                   id="heartRateVital"
                                   className="form-control"
                                   value={heartRateVital}
                                   onChange={(e)=> setHeartRateVital(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="mb-2" htmlFor=" respiratoryRateVital" style={{ fontWeight: 'bold', color: '#000' }}>
                                Respiratory Rate
                            </label>
                            <input type="text"
                                   id="respiratoryRate"
                                   className="form-control"
                                   value={respiratoryRate}
                                   onChange={(e)=> setRespiratoryRate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="mb-2" htmlFor=" temperatureVital" style={{ fontWeight: 'bold', color: '#000' }}>
                                Temperature
                            </label>
                            <input type="text"
                                   id="temperatureVital"
                                   className="form-control"
                                   value={temperatureVital}
                                   onChange={(e)=> setTemperatureVital(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="dateVitals" style={{ fontWeight: 'bold', color: '#000' }}>
                                Date
                            </label>
                            <input
                                type="date"
                                id="dateVitals"
                                className="form-control"
                                value={dateVitals}
                                onChange={(e) => setDateVitals(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="timeOfRecording" style={{ fontWeight: 'bold', color: '#000' }}>
                                Time of Recording
                            </label>
                            <input type="text"
                                   id="timeOfRecording"
                                   className="form-control"
                                   value={timeOfRecording}
                                   onChange={(e)=> setTimeOfRecording(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="mb-2" htmlFor="recordingMethod" style={{ fontWeight: 'bold', color: '#000' }}>
                                Recording method
                            </label>
                            <input type="text"
                                   id="recordingMethod"
                                   className="form-control"
                                   value={recordingMethod}
                                   onChange={(e)=> setRecordingMethod(e.target.value)}
                            />
                        </div>
                    </div>
                </section>
                    <section className="container mt-4 border p-3 rounded">
                        <h2>Lab Results</h2>
                        <hr></hr>
                        <div className="row mb-4">
                            <div className="col-md-3">
                                <label className="mb-2" htmlFor="typeLab" style={{ fontWeight: 'bold', color: '#000' }}>
                                    Type
                                </label>
                                <input
                                    type="text"
                                    id="typeLab"
                                    className="form-select"
                                    value={typeLab}
                                    onChange={(e) => setTypeLab(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className="col-md-4">
                                <label className="mb-2" htmlFor="dateTestLab" style={{ fontWeight: 'bold', color: '#000' }}>
                                    Date of Test
                                </label>
                                <input
                                    type="date"
                                    id="dateTestLab"
                                    className="form-control"
                                    value={dateTestLab}
                                    onChange={(e) => setDateTestLab(e.target.value)}
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="mb-2" htmlFor="resultsLab" style={{ fontWeight: 'bold', color: '#000' }}>
                                    Results
                                </label>
                                <select
                                    id="resultsLab"
                                    className="form-select"
                                    value={resultsLab}
                                    onChange={(e) => setResultsLab(e.target.value)}
                                >
                                    <option value="">Select Results</option>
                                    {resultData.resultsOptions.map((result) => (
                                        <option key={result.id} value={result.id}>
                                            {result.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row align-items-start">
                            <div className="col-md-4">
                                <label className="mb-2" htmlFor="fileUploadCondition" style={{ fontWeight: 'bold', color: '#000' }}>
                                    Medical Records or Documents
                                </label>
                                <input
                                    type="file"
                                    id="fileUploadCondition"
                                    className="form-control"
                                    multiple
                                    accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                                    onChange={handleFileChangeLabResult}
                                />
                            </div>

                            <div className="col-md-8 d-flex flex-wrap gap-3">
                                {selectedFiles.length > 0 && (
                                    selectedFiles.map((file, index) => (
                                        <div key={index} className="card p-3" style={{ width: "150px", textAlign: "center", position: "relative" }}>
                                            <button
                                                type="button"
                                                className="btn btn-sm position-absolute top-0 end-0 m-1"
                                                onClick={() => handleDeleteFile(index)}
                                                style={{
                                                    color: "red",
                                                    backgroundColor: "transparent",
                                                    border: "1px solid red",
                                                    borderRadius: "50%",
                                                    padding: "0.2rem 0.4rem",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                X
                                            </button>

                                            <div className="file-icon mb-2">
                                                {file.type.includes("image") ? (
                                                    <img src="/path/to/image-icon.png" alt="Image" style={{ width: "30px", height: "30px" }} />
                                                ) : file.type === "application/pdf" ? (
                                                    <img src="/path/to/pdf-icon.png" alt="PDF" style={{ width: "30px", height: "30px" }} />
                                                ) : file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                                    <img src="/path/to/word-icon.png" alt="Word" style={{ width: "30px", height: "30px" }} />
                                                ) : (
                                                    <img src="/path/to/file-icon.png" alt="File" style={{ width: "30px", height: "30px" }} />
                                                )}
                                            </div>

                                            <small>{file.name}</small>

                                            <div className="mt-2">
                                                <small>{(file.size / 1024).toFixed(2)} KB</small>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="w-25 mt-3">
                                <ModalComponent onSave={handleSaveModalData} modalId="modal5" />
                            </div>
                            {modalData.modal5 && (
                                <div className="col-md-4 mt-3">
                                    <div className="border p-3 rounded position-relative">
                                        <button
                                            type="button"
                                            className="btn-close position-absolute top-0 end-0"
                                            aria-label="Close"
                                            onClick={() => setModalData(prevState => ({ ...prevState, modal5: null }))}
                                        ></button>
                                        <p><strong>Date:</strong> {modalData.modal5.date}</p>
                                        <p><strong>Start Time:</strong> {modalData.modal5.startTime}</p>
                                        <p><strong>End Time:</strong> {modalData.modal5.endTime}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                    <section className="container mt-4 border p-3 rounded">
                        <h2>Allirgies</h2>
                        <hr/>
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <h6 className="mt-3">Allergies</h6>
                                <select
                                    name="allergies"
                                    value={allergies}
                                    onChange={(e) => setAllergies(e.target.value)}
                                    className="form-select  mx-auto"
                                >
                                    <option value="">Select an allergy</option>
                                    {allergyOptionsData.allergyOptions.map((allergy) => (
                                        <option key={allergy.value} value={allergy.value}>
                                            {allergy.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <h6 className="mt-3">Severity of Reactions</h6>
                                <input
                                    type="test"
                                    id="severityReaction"
                                    className="form-control"
                                    value={severityReaction}
                                    onChange={(e) => setSeverityReaction(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <h6 className="mt-3">Date of Last Reason</h6>
                                <input
                                    type="date"
                                    id="dateLastReason"
                                    className="form-control"
                                    value={dateLastReason}
                                    onChange={(e) => setDateLastReason(e.target.value)}
                                />
                            </div>
                            <div className="w-25 mt-3">
                                <ModalComponent onSave={handleSaveModalData} modalId="modal6" />
                            </div>
                            {modalData.modal6 && (
                                <div className="col-md-4 mt-3">
                                    <div className="border p-3 rounded position-relative">
                                        <button
                                            type="button"
                                            className="btn-close position-absolute top-0 end-0"
                                            aria-label="Close"
                                            onClick={() => setModalData(prevState => ({ ...prevState, modal6: null }))}
                                        ></button>
                                        <p><strong>Date:</strong> {modalData.modal6.date}</p>
                                        <p><strong>Start Time:</strong> {modalData.modal6.startTime}</p>
                                        <p><strong>End Time:</strong> {modalData.modal6.endTime}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>



                <div className="mt-3">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default PatientMedicalClinicalData;
