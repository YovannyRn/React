import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BloodPressureMonitor = () => {
    const [selectedOption, setSelectedOption] = useState("Blood Pressure");

    const options = ["Blood Pressure", "Heart Rate", "Oxygen Levels"];

    const data = {
        "Blood Pressure": [
            { id: 1, value: "120 mmHg - 80 mmHg", time: "08:00 AM", note: "Morning check", status: "success" },
        ],
        "Heart Rate": [
            { id: 2, value: "75 bpm", time: "02:00 PM", note: "Afternoon check", status: "warning" },
        ],
        "Oxygen Levels": [
            { id: 3, value: "98%", time: "08:00 PM", note: "Evening check", status: "danger" },
        ],
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "Health Data",
                text: "Check out my health stats",
                url: window.location.href,
            }).catch((error) => console.log("Error sharing", error));
        } else {
            alert("Sharing not supported on this browser");
        }
    };

    return (
        <div className="container mt-5 p-4 bg-white shadow rounded">
            <div className="d-flex align-items-center mb-3 row">
                <div className="col-3">
                    <select
                        className="form-select w-auto d-inline"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="col-9 d-flex justify-content-end">
                    <button className="btn" onClick={handleShare}>📤</button>
                    <button className="btn" onClick={handlePrint}>🖨️</button>
                    <button className="btn btn-primary">+ Add Data</button>
                </div>
            </div>
            <div className="list-group">
                {data[selectedOption].map((item) => (
                    <div
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span className={`fw-bold text-${item.status}`}>{item.value}</span>
                        <span>{item.time}</span>
                        <span>{item.note}</span>
                        <div>
                            <button className="btn btn-outline-secondary btn-sm me-2">✏️</button>
                            <button className="btn btn-outline-danger btn-sm">🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BloodPressureMonitor;