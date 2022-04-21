import React from "react";
import PropTypes from 'prop-types';
import "./App.css";

const EstimatedActivity = ({activity, unit, units}) => {
    const nf = new Intl.NumberFormat("fr");
    let mainActivity = activity;

    if (unit !== "Bq") {
        mainActivity = (unit === "GBq") ? activity / (10**9) : activity / (10**6);
    }

    mainActivity = nf.format(mainActivity);

    return (
        <div>

            <h2>Estimated Activity</h2>

            <h1>{mainActivity} {unit}</h1>

            {units.map(({name, coeff}) => {

                if (name !== unit) {
                    const act = nf.format(activity / coeff);
                    return (<h3 key={name}>{act} {name}</h3>);
                }
                
                return null;
            })}

        </div>
    );
}

EstimatedActivity.propTypes = {
    activity: PropTypes.number,
    unit: PropTypes.string.isRequired,
    units: PropTypes.array.isRequired
}

EstimatedActivity.defaultProps = {
    activity: 0
}

export default EstimatedActivity;