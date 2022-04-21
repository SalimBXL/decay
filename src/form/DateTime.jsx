import React from "react";
import PropTypes from 'prop-types';
import "./form.css";

const DateTime = ({label, name, value, onChange}) => {
    return (
        <label className='datetime'>
            {label} : &nbsp;
            <input
            type="datetime-local" 
            name={name}
            value={value} 
            onChange={onChange}
            />
        </label>
    );
}

DateTime.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default DateTime;