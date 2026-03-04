import React from "react";
import { Offcanvas, Form, Button, Row, Col } from 'react-bootstrap';
import Select from "react-select";


const FilterOffcanvas = ({
                             showFilterOffcanvas,
                             setShowFilterOffcanvas,
                             filterConditions,
                             handleSearchTermChange,
                             handleSelectChange,
                             handleApplyFilters,
                             cityData,
                             languagesData,
                             maritalStatusData,
                             occupationsData,
                             educationLevelsData,
                             raceEthnicityData,
                             getCurrentSelectValue,
                             illnessesData,
                             surgeriesData,
                             allergiesData,
                             bloodPressureData,
                             labTestData,
                             treatmentData
                         }) => {
    return (
        <Offcanvas show={showFilterOffcanvas} onHide={() => setShowFilterOffcanvas(false)} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filter Patients</Offcanvas.Title>
            </Offcanvas.Header>

            <hr/>
            <Offcanvas.Body>
                <h5>Basic Information</h5>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={filterConditions.name}
                                onChange={(e) => handleSearchTermChange("name", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Surname</Form.Label>
                            <input
                                type="text"
                                id="surname"
                                className="form-control"
                                value={filterConditions.surname}
                                onChange={(e) => handleSearchTermChange("surname", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>DoB</Form.Label>
                            <input
                                type="date"
                                id="date"
                                className="form-control"
                                value={filterConditions.dob}
                                onChange={(e) => handleSearchTermChange("dob", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Age</Form.Label>
                            <input
                                type="number"
                                id="age"
                                className="form-control"
                                value={filterConditions.age}
                                onChange={(e) => handleSearchTermChange("age", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <hr/>
                    <h5>Contact Information</h5>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Select
                                options={cityData.cityOptions}
                                value={getCurrentSelectValue('city', cityData.cityOptions)} // Valor actual de la ciudad
                                onChange={(option) => handleSelectChange(option, 'city')} // Maneja el cambio de selección
                                className="mb-3"
                                placeholder="Select City"
                            />
                        </Form.Group>
                    </Col>


                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Postal Code</Form.Label>
                            <input
                                type="number"
                                id="zipcode"
                                className="form-control"
                                value={filterConditions.zipcode}
                                onChange={(e) => handleSearchTermChange("zipcode", e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <hr/>
                <h5>Social and Demographic</h5>
                <Row>
                        <Form.Group>
                            <Form.Label>Language</Form.Label>
                            <Select
                                options={languagesData.languageOptions}
                                value={getCurrentSelectValue('languages', languagesData.languageOptions)}
                                onChange={(option) => handleSelectChange(option, 'languages')}
                                className="mb-3"
                                placeholder="Select Language"
                            />
                        </Form.Group>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Marital Status</Form.Label>
                            <Select
                                options={maritalStatusData.maritalStatusOptions}
                                value={getCurrentSelectValue('maritalStatus', maritalStatusData.maritalStatusOptions)}
                                onChange={(option) => handleSelectChange(option, 'maritalStatus')}
                                className="mb-3"
                                placeholder="Select Marital Status"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Occupation</Form.Label>
                            <Select
                                options={occupationsData.occupationOptions}
                                value={getCurrentSelectValue('position', occupationsData.occupationOptions)}
                                onChange={(option) => handleSelectChange(option, 'position')}
                                className="mb-3"
                                placeholder="Select Occupation"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Education Level</Form.Label>
                            <Select
                                options={educationLevelsData.educationLevelOptions}
                                value={getCurrentSelectValue('education', educationLevelsData.educationLevelOptions)}
                                onChange={(option) => handleSelectChange(option, 'education')}
                                className="mb-3"
                                placeholder="Select Education Level"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Race/Ethnicity</Form.Label>
                            <Select
                                options={raceEthnicityData.raceEthnicityOptions}
                                value={getCurrentSelectValue('race', raceEthnicityData.raceEthnicityOptions)}
                                onChange={(option) => handleSelectChange(option, 'race')}
                                className="mb-3"
                                placeholder="Select Race/Ethnicity"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <hr/>
                <h5> Medical </h5>
                <Row>
                    <Form.Group>
                        <Form.Label>Current Conditions</Form.Label>
                        <input
                            type="text"
                            id="CurrentCondition"
                            className="form-control"
                            value={filterConditions.currentCondition}
                            onChange={(e) => handleSearchTermChange("CurrentCondition", e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group> Illnesses</Form.Group>
                        <Select
                            options={illnessesData.illnesses}
                            value={getCurrentSelectValue('ellnesses', illnessesData.illnesses)}
                            onChange={(option) => handleSelectChange(option, 'ellnesses')}
                            className="mb-3"
                            placeholder="Select Illnesses"
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Group> Surgies</Form.Group>
                        <Select
                            options={surgeriesData.surgeryOptions}
                            value={getCurrentSelectValue('surgeries', surgeriesData.surgeryOptions)}
                            onChange={(option) => handleSelectChange(option, 'surgeries')}
                            className="mb-3"
                            placeholder="Select Surgeries"
                        />
                    </Col>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Current Medications</Form.Label>
                        <input
                            type="text"
                            id="CurrentMedications"
                            className="form-control"
                            value={filterConditions.currentCondition}
                            onChange={(e) => handleSearchTermChange("CurrentMedications", e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Group> Allergies</Form.Group>
                        <Select
                            options={allergiesData.allergyOptions}
                            value={getCurrentSelectValue('allergies', allergiesData.allergyOptions)}
                            onChange={(option) => handleSelectChange(option, 'allergies')}
                            className="mb-3"
                            placeholder="Select Allergies"
                        />
                    </Form.Group>
                </Row>
                <hr/>
                <h5>Vitals</h5>
                <Row>
                    <Form.Group>
                        <Form.Label>Blood Pressure</Form.Label>
                        <Select
                            options={bloodPressureData.bloodPressureOptions}
                            value={getCurrentSelectValue('bloodPressure', bloodPressureData.bloodPressureOptions)}
                            onChange={(option) => handleSelectChange(option, 'bloodPressure')}
                            className="mb-3"
                            placeholder="Select Blood Pressure"
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Lab Test</Form.Label>
                        <Select
                            options={labTestData.labTests}
                            value={getCurrentSelectValue('labTest', labTestData.labTests)}
                            onChange={(option) => handleSelectChange(option, 'labTest')}
                            className="mb-3"
                            placeholder="Select Lab Test"
                        />
                    </Form.Group>

                </Row>

                <hr/>
                <h5>Appointment and Visit</h5>
                <Row>
                    <Form.Group>
                        <Form.Label>Last Appointment Date</Form.Label>
                        <input
                            type="date"
                            id="lastAppointmentDate"
                            className="form-control"
                            value={filterConditions.lastAppointmentDate}
                            onChange={(e) => handleSearchTermChange("lastAppointmentDate", e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Upcoming Appointment Date</Form.Label>
                        <input
                            type="date"
                            id="upcomingAppointmentDate"
                            className="form-control"
                            value={filterConditions.upcomingAppointmentDate}
                            onChange={(e) => handleSearchTermChange("upcomingAppointmentDate", e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Last Visit Date</Form.Label>
                        <input
                            type="date"
                            id="lastVisitDate"
                            className="form-control"
                            value={filterConditions.lastVisitDate}
                            onChange={(e) => handleSearchTermChange("lastVisitDate", e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Reason for Last Visit</Form.Label>
                        <input
                            type="text"
                            id="reasonForLastVisit"
                            className="form-control"
                            value={filterConditions.reasonForLastVisit}
                            onChange={(e) => handleSearchTermChange("reasonForLastVisit", e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <hr/>
                <Row>
                    <Form.Group>
                        <Form.Label>Undergoing Treatment</Form.Label>
                        <input
                            type="text"
                            id="undergoingTreatment"
                            className="form-control"
                            value={filterConditions.undergoingTreatment}
                            onChange={(e) => handleSearchTermChange("undergoingTreatment", e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Completed Treatment</Form.Label>
                        <input
                            type="text"
                            id="completeTreatment"
                            className="form-control"
                            value={filterConditions.completeTreatment}
                            onChange={(e) => handleSearchTermChange("completeTreatment", e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Treatment Plan</Form.Label>
                        <Select
                            options={treatmentData.treatmentPlans}
                            value={getCurrentSelectValue('treatmentPlan', treatmentData.treatmentPlans)}
                            onChange={(option) => handleSelectChange(option, 'treatmentPlan')}
                            className="mb-3"
                            placeholder="Select Treatment Plans"
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" onClick={handleApplyFilters}>Apply Filters</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default FilterOffcanvas;