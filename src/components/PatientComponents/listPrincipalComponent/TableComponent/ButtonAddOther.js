import React, { useState } from "react";
import timeData from "../../../../data/times.json";

const ModalComponent = ({ onSave, modalId }) => {
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSaveChanges = () => {
        const newData = {
            date: startDate,
            startTime: startTime,
            endTime: endTime,
        };

        onSave(newData, modalId);

        // Cierra el modal
        const modalCloseButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (modalCloseButton) {
            modalCloseButton.click();
        }
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#exampleModal-${modalId}`}
            >
                Add Other
            </button>

            <div
                className="modal fade"
                id={`exampleModal-${modalId}`}
                tabIndex="-1"
                aria-labelledby={`exampleModalLabel-${modalId}`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`exampleModalLabel-${modalId}`}>
                                Date-Specific Hours
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="datePicker" className="form-label">
                                        Select Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Timing</label>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label htmlFor="startTime" className="form-label">
                                                Start Time
                                            </label>
                                            <select
                                                id="startTime"
                                                className="form-select"
                                                value={startTime}
                                                onChange={(e) => setStartTime(e.target.value)}
                                            >
                                                <option value="">Select a time</option>
                                                {timeData.times.map((time, index) => (
                                                    <option key={index} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="endTime" className="form-label">
                                                End Time
                                            </label>
                                            <select
                                                id="startTime"
                                                className="form-select"
                                                value={endTime}
                                                onChange={(e) => setEndTime(e.target.value)}
                                            >
                                                <option value="">Select a time</option>
                                                {timeData.times.map((time, index) => (
                                                    <option key={index} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalComponent;
