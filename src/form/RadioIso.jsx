import React from "react";
import PropTypes from 'prop-types';
import "./form.css";

const RadioIso = ({isotopes, isotope, onChange}) => {
    return (
        <label style={{size: "50px"}}>
            Isotope : &nbsp;
            <select name="isotope" value={isotope} onChange={onChange} >
                {isotopes.map((value, index) => <option key={value.name} value={index}>{value.name}</option>)}
            </select>
        </label>
    );
}

RadioIso.propTypes = {
    isotopes: PropTypes.array.isRequired
}

export default RadioIso;