import React from "react";
import PropTypes from 'prop-types';
import "./form.css";

const AutoDecay = ({value, minutes, onChange}) => {
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

                {value && <span>&nbsp;&nbsp;<small>({minutes} min.)</small></span>}
            </label>
        </div>
    );
}

AutoDecay.propTypes = {
    value: PropTypes.bool,
    minutes: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

AutoDecay.defaultProps = {
    value: false,
    minutes: null
}

export default AutoDecay;