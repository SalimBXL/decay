import React from "react";
import PropTypes from 'prop-types';
import "./form.css";

const AutoDecay = ({value, onChange}) => {
    return (
        <div>
            <label>
                AutoDecay &nbsp;
                <input 
                    type="checkbox" 
                    name="autodecay" 
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}

AutoDecay.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired
}

AutoDecay.defaultProps = {
    value: false
}

export default AutoDecay;