import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import genderData from '../../../data/genderOptions.json';
import languageData from '../../../data/languageOptions.json';
import cityData from '../../../data/cityOptions.json';
import raceData from '../../../data/raceEthnicityOptions.json';
import maritalData from '../../../data/maritalStatusOptions.json';
import educationData from '../../../data/educationLevelOptions.json';
import positionData from '../../../data/occupationOptions.json';
import * as url from '../../../helpers/urlHelper';
import { uploadSingleFile } from '../../../helpers/uploadHelper';

const PatientSave = ({ show, handleClose, isEdit, patientData }) => {
    const [formData, setFormData] = useState({
        image: null,
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: "",
        zipcode: "",
        gender: '',
        dob: "",
        languages: [],
        city: '',
        emergencycontact: '',
        emergencycontactname: '',
        emergencycontactrelation: "",
        insuranceCompany: "",
        insurance: false,
        insuranceNumber: '',
        race: '',
        maritalStatus: '',
        education: '',
        position: '',
        height: '',
        weight: '',
        isSmoker: false,
        isAlcoholAddict: false,
        isDrugAddict: false,
        address: '',
        about: '',
        summary: '',
        role: 'patient',

    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit && patientData) {
            setFormData({
                ...formData,
                ...patientData,
                image: null,
                role: patientData.role || 'patient',
            });
        } else {
            setFormData({
                image: null,
                name: '',
                surname: '',
                email: '',
                phone: '',
                password: "",
                zipcode: "",
                gender: '',
                dob: null,
                languages: [],
                city: '',
                emergencycontact: '',
                emergencycontactname: '',
                emergencycontactrelation: "",
                insuranceCompany: "",
                insurance: false,
                insuranceNumber: '',
                race: '',
                maritalStatus: '',
                education: '',
                position: '',
                height: '',
                weight: '',
                isSmoker: false,
                isAlcoholAddict: false,
                isDrugAddict: false,
                address: '',
                about: '',
                summary: '',
                role: 'patient',
            });
        }
    }, [patientData, isEdit]);

    const handleTextInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (e) => {
        const { files } = e.target;
        if (files[0]) {
            try {
                setLoading(true);
                const fileData = await uploadSingleFile(files[0]);
                if (fileData && fileData._id) {
                    setFormData((prev) => ({
                        ...prev,
                        photoImage: fileData._id,
                    }));
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleSelectChange = (selectedOption, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: selectedOption ? selectedOption.value : '',
        }));
    };

    const handleMultiSelectChange = (selectedOptions, field) => {
        const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
        setFormData((prev) => ({
            ...prev,
            [field]: values,
        }));
    };

    const getCurrentSelectValue = (field, options) => {
        return options.find((option) => option.value === formData[field]) || null;
    };

    const getCurrentMultiSelectValue = (field, options) => {
        return options.filter((option) => formData[field].includes(option.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const apiUrl = `${url.API_BASE_URL}${isEdit ? url.API_PATIENT_UPDATE : url.API_PATIENT_CREATE}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            handleClose();

            if (result && result._id) {
                console.log('Paciente creado con éxito, ID:', result._id);
                setFormData({
                    image: null,
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    password: "",
                    zipcode: "",
                    gender: '',
                    dob: null,
                    languages: [],
                    city: '',
                    emergencycontact: '',
                    emergencycontactname: '',
                    emergencycontactrelation: "",
                    insuranceCompany: "",
                    insurance: false,
                    insuranceNumber: '',
                    race: '',
                    maritalStatus: '',
                    education: '',
                    position: '',
                    height: '',
                    weight: '',
                    isSmoker: false,
                    isAlcoholAddict: false,
                    isDrugAddict: false,
                    address: '',
                    about: '',
                    summary: '',
                    role: 'patient',
                });
            } else {
                console.error('No se ha devuelto un ID de paciente.');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    };

    return (
        <div className={`offcanvas offcanvas-end ${show ? 'show' : ''}`} tabIndex="-1" id="patientSaveOffcanvas" style={{ width: '50%' }}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">
                    {isEdit ? 'Edit Patient' : 'Add New Patient'}
                </h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="offcanvas-body">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="row mt-3 mb-2">
                            <div className="col-md-3">
                                <input type="file" className="form-control mb-3" accept="image/*" onChange={handleFileUpload} />
                                {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>}
                            </div>

                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="mb-3"> Name</label>
                                        <input type="text" className="form-control mb-3" name="name" placeholder="Name" value={formData.name} onChange={handleTextInput} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="mb-3"> Surname</label>
                                        <input type="text" className="form-control mb-3" name="surname" placeholder="Surname" value={formData.surname} onChange={handleTextInput} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="mb-3"> Phone</label>
                                        <input type="tel" className="form-control mb-3" name="phone" placeholder="Phone" value={formData.phone} onChange={handleTextInput} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="mb-3"> email</label>
                                        <input type="email" className="form-control mb-3" name="email" placeholder="Email" value={formData.email} onChange={handleTextInput} required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row mb-2">
                            <div className="col-md-3">
                                <label className="mb-3"> gender</label>

                                <Select options={genderData.genderOptions} value={getCurrentSelectValue('gender', genderData.genderOptions)} onChange={(option) => handleSelectChange(option, 'gender')} className="mb-3" placeholder="Gender" />
                            </div>
                            <div className="col-md-3">
                                <label className="mb-3"> dob</label>

                                <input type="date" className="form-control mb-3" name="dob" value={formData.dob} onChange={handleTextInput} />
                            </div>

                            <div className="col-md-3">
                                <label className="mb-3"> languages</label>
                                <Select
                                    options={languageData.languageOptions}
                                    value={getCurrentMultiSelectValue('languages', languageData.languageOptions)}
                                    onChange={(options) => handleMultiSelectChange(options, 'languages')}
                                    isMulti
                                    className="mb-3"
                                    placeholder="Languages"
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="mb-3"> City</label>

                                <Select options={cityData.cityOptions} value={getCurrentSelectValue('city', cityData.cityOptions)} onChange={(option) => handleSelectChange(option, 'city')} className="mb-3" placeholder="City" />
                            </div>
                        </div>
                        <hr />
                        <div className="row mb-2">
                            <div className="col-md-4">
                                <label className="mb-3"> Emergency contact</label>

                                <input type="text" className="form-control mb-3" name="emergencycontact" placeholder="Emergency Contact" value={formData.emergencycontact} onChange={handleTextInput} />
                            </div>
                            <div className="col-md-4">
                                <label className="mb-3"> Emergency name</label>

                                <input type="text" className="form-control mb-3" name="emergencycontactname" placeholder="Emergency Contact Name" value={formData.emergencycontactname} onChange={handleTextInput} />
                            </div>
                            <div className="col-md-4">
                                <label className="mb-3"> relation </label>

                                <input type="text" className="form-control mb-3" name="emergencycontactrelation" placeholder="Relation" value={formData.emergencycontactrelation} onChange={handleTextInput} />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6">
                                <label className="mb-3"> Insurance Company</label>

                                <input type="text" className="form-control mb-3" name="insuranceCompany" placeholder="Insurance Company" value={formData.insuranceCompany} onChange={handleTextInput} />
                            </div>
                            <div className="col-md-6">
                                <label className="mb-3"> Insurance Number</label>

                                <input type="text" className="form-control mb-3" name="insuranceNumber" placeholder="Insurance Number" value={formData.insuranceNumber} onChange={handleTextInput} />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-4">
                                <label className="mb-3"> Race</label>
                                <Select options={raceData.raceEthnicityOptions} value={getCurrentSelectValue('race', raceData.raceEthnicityOptions)} onChange={(option) => handleSelectChange(option, 'race')} className="mb-3" placeholder="Race" />
                            </div>
                            <div className="col-md-4">
                                <label className="mb-3"> Marial Status</label>

                                <Select options={maritalData.maritalStatusOptions} value={getCurrentSelectValue('maritalStatus', maritalData.maritalStatusOptions)} onChange={(option) => handleSelectChange(option, 'maritalStatus')} className="mb-3" placeholder="Marital Status" />
                            </div>
                            <div className="col-md-4">
                                <label className="mb-3"> Education Level</label>

                                <Select options={educationData.educationLevelOptions} value={getCurrentSelectValue('education', educationData.educationLevelOptions)} onChange={(option) => handleSelectChange(option, 'education')} className="mb-3" placeholder="Education" />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-4">
                                <label className="mb-3"> Position</label>

                                <Select options={positionData.occupationOptions} value={getCurrentSelectValue('position', positionData.occupationOptions)} onChange={(option) => handleSelectChange(option, 'position')} className="mb-3" placeholder="Position" />
                            </div>
                            <div className="col-md-4">
                                <label className="mb-3"> Height</label>

                                <input type="number" className="form-control mb-3" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleTextInput} />
                            </div>
                            <div className="col-md-4">
                                <label className="mb-3"> weight</label>
                                <input type="number" className="form-control mb-3" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleTextInput} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="isSmoker" checked={formData.isSmoker} onChange={(e) => setFormData({ ...formData, isSmoker: e.target.checked })} />
                                    <label className="form-check-label">Is Smoker</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="isAlcoholAddict" checked={formData.isAlcoholAddict} onChange={(e) => setFormData({ ...formData, isAlcoholAddict: e.target.checked })} />
                                    <label className="form-check-label">Is Alcohol Addict</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="isDrugAddict" checked={formData.isDrugAddict} onChange={(e) => setFormData({ ...formData, isDrugAddict: e.target.checked })} />
                                    <label className="form-check-label">Is Drug Addict</label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-12">
                                <label className="mb-3"> address</label>
                                <textarea className="form-control mb-3" name="address" placeholder="address" value={formData.address} onChange={handleTextInput}></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="mb-3"> about</label>
                                <textarea className="form-control mb-3" name="about" placeholder="About" value={formData.about} onChange={handleTextInput}></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="mb-3"> Summary</label>
                                <textarea className="form-control mb-3" name="summary"  value={formData.summary} onChange={handleTextInput}></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? 'Saving...' : (isEdit ? 'Update Patient' : 'Add Patient')}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientSave;