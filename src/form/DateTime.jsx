import React from "react";
import PropTypes from 'prop-types';
import "./form.css";

const DateTime = ({label, name, value, enable, onChange}) => {
    return (
        <label className='datetime'>
            {label} : &nbsp;
            <input
                type="datetime-local" 
                name={name}
                value={value} 
                onChange={onChange}
                disabled={!enable}
            />
        </label>
    );
}

DateTime.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    enable: PropTypes.bool,
    onChange: PropTypes.func.isRequired
}

DateTime.defaultProps = {
    enable: true
}

export default DateTime;