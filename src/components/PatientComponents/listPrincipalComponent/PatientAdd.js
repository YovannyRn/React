import React from 'react';
import {Button, Box, Typography, Grid} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PatientAdd = ({ onAddNew }) => {
    return (
        <Button
            startIcon={<AddIcon />}
            onClick={onAddNew}
            sx={{
                backgroundColor: "#007bff",
                color: "white",

            }}
        >
            <span style={{ fontSize: "10px" }}>New Patient</span>
        </Button>
    );
};

export default PatientAdd;
