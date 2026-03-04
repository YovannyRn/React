import React, {useEffect, useMemo, useState} from "react";
import PatientDetailsPanel from "../listPrincipalComponent/TableComponent/PatientDetails";
import PatientMedicalClinicalData from "../listPrincipalComponent/TableComponent/PatientMedicalClinicalData";
import PatientMedicalConsent from "../listPrincipalComponent/TableComponent/PatientMedicalConsent";
import {MaterialReactTable} from "material-react-table";
import {IconButton, MenuItem, Menu} from "@mui/material";
import { Button} from 'react-bootstrap';
import axios from "axios";
import {API_BASE_URL, API_PATIENT_DELETE, API_PATIENT_LIST} from "../../../helpers/urlHelper";
import PatientSave from "../listPrincipalComponent/PatientSave";
import PatientAdd from "../listPrincipalComponent/PatientAdd";
import SearchInput from "../listPrincipalComponent/PatientSearch";
import cityData from "../../../data/cityOptions.json";
import maritalStatusData from "../../../data/maritalStatusOptions.json";
import occupationsData from "../../../data/occupationOptions.json";
import educationLevelsData from "../../../data/educationLevelOptions.json";
import raceEthnicityData from "../../../data/raceEthnicityOptions.json";
import languagesData from "../../../data/languageOptions.json";
import illnessesData from "../../../data/illnesses.json";
import surgeriesData from "../../../data/surgeryOptions.json";
import allergiesData from "../../../data/allergyOptions.json";
import bloodPressureData from "../../../data/bloodPressureOptions.json";
import labTestData from "../../../data/labTest.json";
import treatmentData from "../../../data/treatmentPlans.json";
import ActiveFilters from "../listPrincipalComponent/TableComponent/ActiveFilter";
import FilterOffcanvas from "../listPrincipalComponent/PatientFilter";
import PatientKPIs from "../listPrincipalComponent/PatientKPI";
import ActionButton from "../listPrincipalComponent/PatientActions";

const PatientsTable = ( ) => {
    const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
    const [showPanelDetails, setShowPanelDetails] = useState(false);
    const [selectedPatientMedicalConsent, setSelectedPatientMedicalConsent] = useState(null);
    const [selectedPatientMedicalClinical, setSelectedPatientMedicalClinical] = useState(null);
    const [showPanelMedicalClinical, setShowPanelMedicalClinical] = useState(false);
    const [showPanelMedicalConsent, setShowPanelMedicalConsent] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [patients, setPatients] = useState([]);

    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showAddPatientOffcanvas, setShowAddPatientOffcanvas] = useState(false);
    const [showFilterOffcanvas, setShowFilterOffcanvas] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [showKPIs, setShowKPIs] = useState(false);
    const [showActiveFilters, setShowActiveFilters] = useState(true);


    const [isLoading, setIsLoading] = useState(true);

    const [appliedFilters, setAppliedFilters] = useState({
        name: "",
        surname: "",
        dob: "",
        age: "",
        city: "",
        zipcode: "",
        maritalStatus: "",
        position: "",
        education: "",
        race: "",
        languages: "",
        currentCondition:"",
        currentMedication:"",
        reasonForLastVisit:"",
        lastVisitDate:"",
        upcomingAppointmentDate:"",
        lastAppointmentDate:"",
        completeTreatment:"",
        undergoingTreatment:"",
    });
    const [filterConditions, setFilterConditions] = useState({
        name: "",
        surname: "",
        dob: "",
        age: "",
        city: "",
        zipcode: "",
        maritalStatus: "",
        position: "",
        education: "",
        race: "",
        languages: "",
        currentCondition:"",
        currentMedication:"",
        reasonForLastVisit:"",
        lastVisitDate:"",
        upcomingAppointmentDate:"",
        lastAppointmentDate:"",
        completeTreatment:"",
        undergoingTreatment:"",
    });

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}${API_PATIENT_LIST}`);
            if (response.data.status) {
                setPatients(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching Patient:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleDetailsClick = (patient) => {
        setSelectedPatientDetails(patient);
        setShowPanelDetails(true);
    };

    const handleMedicalClinicalClick = (patient) => {
        setSelectedPatientMedicalClinical(patient);
        setShowPanelMedicalClinical(true);
    };

    const handleMedicalConsentClick = (patient) => {
        setSelectedPatientMedicalConsent(patient);
        setShowPanelMedicalConsent(true);
    };


    const columns = useMemo(() => [

        {

            accessorKey: "actions",
            header: "Actions",
            Cell: ({ row }) => {
                const [anchorEl, setAnchorEl] = useState(null);
                const open = Boolean(anchorEl);

                const handleClick = (event) => {
                    setAnchorEl(event.currentTarget);
                };

                const handleClose = () => {
                    setAnchorEl(null);
                };

                return (
                    <>
                        <IconButton onClick={handleClick}>
                            <p>...</p>
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={() => handleDetailsClick(row.original)}>Details</MenuItem>
                            <MenuItem onClick={() => handleMedicalClinicalClick(row.original)}>Medical & Clinical Data</MenuItem>
                            <MenuItem>Patient Treatment</MenuItem>
                            {/* <MenuItem onClick={() => navigate("/appointment", { state: { patient: row.original } })}>Appointment</MenuItem>
                            <MenuItem onClick={() => navigate("/vaccination", { state: { patient: row.original } })}>Documents</MenuItem>*/}
                            <MenuItem onClick={() => handleMedicalConsentClick(row.original)}>Medical Consent</MenuItem>
                            <MenuItem
                                onClick={async () => {
                                    const userId = row.original.id;
                                    const confirmDelete = window.confirm(`Are you sure you want to delete user ${userId}?`);

                                    if (confirmDelete) {
                                        try {
                                            const url = API_BASE_URL + API_PATIENT_DELETE.replace(":id", userId);
                                            const response = await fetch(url, {
                                                method: "DELETE",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                }
                                            });

                                            if (!response.ok) {
                                                throw new Error(`Error: ${response.statusText}`);
                                            }

                                            const data = await response.json();
                                            console.log("User deleted:", data);

                                            fetchPatient();
                                        } catch (error) {
                                            console.error("Error deleting user:", error);
                                        }
                                    }
                                }}
                            >
                                Delete
                            </MenuItem>
                        </Menu>
                    </>
                );
            },
            size: 50,
        },
        {
            accessorKey: "name",
            header: "Name",
            Cell: ({ row }) => (
                <div
                    className="d-flex align-items-center"
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => handleRowClick(row)}
                >
                    <img
                        src={row.original.photo || "https://via.placeholder.com/100"}
                        alt="Patient"
                        className="img-fluid rounded-circle me-2"
                        style={{ width: "30px", height: "30px", objectFit: "cover" }}
                    />
                    <span>{row.original.name} {row.original.surname}</span>
                </div>
            ),
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "gender",
            header: "Gender",
        },
        {
            accessorKey: "dob",
            header: "DOB",
        },
        {
            accessorKey: "insurance",
            header: "Insurance",
        },
        {
            accessorKey: "address",
            header: "Address",
        },
        {
            accessorKey: "medicalHistory",
            header: "Medical History",
        },
    ], [patients ]);

    const handleRowClick = (row) => {
        setSelectedPatient(row.original);
        setIsEdit(true);
        setShowAddPatientOffcanvas(true);
    };
    const handleCloseAddOffcanvas = () => {
        setShowAddPatientOffcanvas(false);
        setSelectedPatient(null);
        setIsEdit(false);
    };
    const handleAddNew = () => {
        setShowAddPatientOffcanvas(true);
    };

    const handleFilterClick = () => {
        setShowFilterOffcanvas(true);
    };
    const handleApplyFilters = () => {
        setAppliedFilters(filterConditions);
        setShowFilterOffcanvas(false);
    };
    const applyFilters = (patients) => {
        return patients.filter((patient) => {
            const matchesSearchTerm = searchTerm
                ? patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.email.toLowerCase().includes(searchTerm.toLowerCase())
                : true;

            const matchesFilterConditions =
                (appliedFilters.name ? patient.name.toLowerCase().includes(appliedFilters.name.toLowerCase()) : true) &&
                (appliedFilters.surname ? patient.surname.toLowerCase().includes(appliedFilters.surname.toLowerCase()) : true) &&
                (appliedFilters.dob ? patient.dob === appliedFilters.dob : true) &&
                (appliedFilters.age ? patient.age === appliedFilters.age : true) &&
                (appliedFilters.city ? patient.city === appliedFilters.city : true) &&
                (appliedFilters.zipcode ? patient.zipcode === appliedFilters.zipcode : true) &&
                (appliedFilters.maritalStatus ? patient.maritalStatus === appliedFilters.maritalStatus : true) &&
                (appliedFilters.position ? patient.position === appliedFilters.position : true) &&
                (appliedFilters.education ? patient.education === appliedFilters.education : true) &&
                (appliedFilters.race ? patient.race === appliedFilters.race : true) &&
                (appliedFilters.languages ? patient.languages === appliedFilters.languages : true);

            return matchesSearchTerm && matchesFilterConditions;
        });
    };
    const filteredPatients = useMemo(() => applyFilters(patients), [patients, appliedFilters, searchTerm]);
    const handleRemoveFilter = (filterKey) => {
        const newFilterConditions = { ...filterConditions };
        delete newFilterConditions[filterKey];
        setFilterConditions(newFilterConditions);
        setAppliedFilters(newFilterConditions);
    };
    const handleClearAll = () => {
        setFilterConditions({});
        setAppliedFilters({});
    };
    const toggleKPIsVisibility = () => {
        setShowKPIs(prevState => !prevState);
    };
    const toggleActiveFiltersVisibility = () => {
        setShowActiveFilters(prevState => !prevState);
    };

    return (
        <><div className="d-flex">
            <span className="fw-bold">dashboard/</span><span className="text-secondary me-3"> patient</span>
            <div className="d-flex justify-content-between mb-3">
        <span onClick={toggleKPIsVisibility} style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}>
          {showKPIs ? "Hide KPIs" : "Show KPIs"}
        </span>
            </div>
        </div>

            <PatientKPIs patients={filteredPatients} showKPIs={showKPIs} />

            <div className="row mb-3 mt-3 d-flex justify-content-between">
                <div className="col-3">
                    <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <div className="col-auto d-flex ">
                    <div className="me-3">
                        <ActionButton/>
                    </div>

                    <div className="me-3">
                        <PatientAdd onAddNew={handleAddNew} />
                    </div>
                    <div className="me-3">
                        <Button onClick={handleFilterClick}>Filter</Button>
                    </div>
                    <div className="me-3">
                        <Button
                            onClick={toggleActiveFiltersVisibility}
                        >
                            {showActiveFilters ? 'Hide Filters' : 'Show Filters'}
                        </Button>
                    </div>
                </div>
            </div>
            {showActiveFilters && (
                <ActiveFilters
                    filterConditions={filterConditions}
                    handleRemoveFilter={handleRemoveFilter}
                    handleClearAll={handleClearAll}
                />
            )}


            <MaterialReactTable
                columns={columns}
                data={filteredPatients}
                state={{ isLoading }}
                enableRowSelection={true}
                enableColumnFilters
                enableColumnOrdering
                enableSorting
                enablePagination
            />
            <FilterOffcanvas
                showFilterOffcanvas={showFilterOffcanvas}
                setShowFilterOffcanvas={setShowFilterOffcanvas}
                filterConditions={filterConditions}
                handleSearchTermChange={(field, value) => setFilterConditions({ ...filterConditions, [field]: value })}
                handleSelectChange={(option, field) => setFilterConditions({ ...filterConditions, [field]: option.value })}
                handleApplyFilters={handleApplyFilters}
                cityData={cityData}
                languagesData={languagesData}
                maritalStatusData={maritalStatusData}
                occupationsData={occupationsData}
                educationLevelsData={educationLevelsData}
                raceEthnicityData={raceEthnicityData}
                illnessesData={illnessesData}
                surgeriesData={surgeriesData}
                allergiesData={allergiesData}
                bloodPressureData={bloodPressureData}
                labTestData={labTestData}
                treatmentData={treatmentData}
                getCurrentSelectValue={(field, options) => options.find(option => option.value === filterConditions[field])}
            />
            <PatientSave
                show={showAddPatientOffcanvas}
                handleClose={handleCloseAddOffcanvas}
                isEdit={isEdit}
                patientData={selectedPatient}
            />
            <PatientDetailsPanel
                selectedPatientDetails={selectedPatientDetails}
                showPanelDetails={showPanelDetails}
                setShowPanelDetails={setShowPanelDetails}
            />
            <PatientMedicalClinicalData
                selectedPatientMedical={selectedPatientMedicalClinical}
                showPanelMedical={showPanelMedicalClinical}
                setShowPanelMedical={setShowPanelMedicalClinical}
            />
            <PatientMedicalConsent
                selectedPatientMedicalConsent={selectedPatientMedicalConsent}
                showPanelMedicalConsent={showPanelMedicalConsent}
                setShowPanelMedicalConsent={setShowPanelMedicalConsent}
            />
        </>
    );
};

export default PatientsTable;