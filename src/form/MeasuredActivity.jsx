import React from "react";
import PropTypes from 'prop-types';
import "./form.css";

const MeasuredActivity = ({units, activity, unit, onChange}) => {
    return (
        <div className='activity-measured'>
        
            <label style={{size: "50px"}}>
            Activity : &nbsp;
            <input
                size="5"
                maxLength="7"
                type="text" 
                name="value"
                value={activity} 
                onChange={onChange}
            />
            </label>

            &nbsp;&nbsp;

            <label style={{size: "50px"}}>
                Unit : &nbsp;
                <select name="unit" value={unit} onChange={onChange} >
                    {units.map(({name, coeff}) => <option key={name} value={name}>{name}</option>)}
                </select>
            </label>
            
        </div>
    );
}

MeasuredActivity.propTypes = {
    units: PropTypes.array.isRequired,
    activity: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}


export default MeasuredActivity;