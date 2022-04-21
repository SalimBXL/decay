import React from "react";
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

export default DateTime;