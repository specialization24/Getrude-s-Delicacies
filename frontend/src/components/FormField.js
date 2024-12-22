// src/components/FormField.js

import React from "react";

const FormField = ({ label, type, value, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            <input type={type} value={value} onChange={onChange} required />
        </div>
    );
};

export default FormField;