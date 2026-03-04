import React, { useState } from "react";
import { FaEnvelope, FaComment, FaDownload } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const ActionButton = () => {
    const [selectedAction, setSelectedAction] = useState("");
    const navigate = useNavigate();

    const handleActionClick = (action) => {
        setSelectedAction(action);
        console.log(`${action} clicked`);


        if (action === "Send Mail") {

            navigate("/mail");
        }
        if (action === "Send Chat") {

            navigate("/message");
        }

    };


    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" className="d-flex justify-content-center align-items-center">
                    <p className="mb-0">Actions</p>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleActionClick("Send Mail")} className="d-flex align-items-center">
                        <FaEnvelope className="me-2" />
                        Send Mail
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleActionClick("Send Chat")} className="d-flex align-items-center">
                        <FaComment className="me-2" />
                        Send Chat
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleActionClick("Download Report")} className="d-flex align-items-center">
                        <FaDownload className="me-2" />
                        Download Report
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleActionClick("Export CSV")} className="d-flex align-items-center">
                        CSV
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleActionClick("Export PDF")} className="d-flex align-items-center">
                        PDF
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleActionClick("Export Excel")} className="d-flex align-items-center">
                        Excel
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default ActionButton;
