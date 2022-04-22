import logo from './logo512.png';
import { useState, useEffect, useMemo } from 'react';
import DateTime from './form/DateTime';
import MeasuredActivity from "./form/MeasuredActivity";
import RadioIso from './form/RadioIso';
import AutoDecay from "./form/AutoDecay";
import EstimatedActivity from './EstimatedActivity';
import './App.css';

function App() {

  const eConstant = 2.71828;
  const deltaConstant = 0.693;
  const Units = [
    {name: "GBq", coeff: (10**9)},
    {name: "MBq", coeff: (10**6)},
    {name: "Bq", coeff: 1}
  ];
  const Tracers = [
    {name: "FDG", constant: 109.771}
  ]
  const [decayCompute, setDecayCompute] = useState();
  const [autoDecay, setAutoDecay] = useState(false);
  const [minutes, setMinutes] = useState("");
  const [isotope, setIsotope] = useState(0);
  const [decay, setDecay] = useState({
    datetimeMeasured: "",
    datetimeDesired: "",
    value: 0, 
    unit: Units[0].name
  });
  
  const handleIsotope = (event) => setIsotope((prev) => event.target.value);
  const handleAutoDecayChange = () => setAutoDecay(prev => !prev);
  const handleSubmit = (event) => event.preventDefault();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDecay(values => ({...values, [name]: value}));
  }
  
  const minutesBetweenTwoDateTime = (t1, t2) => {
    const _minutes = Math.floor( (t1 - t2) / 1000 / 60 );
    const minutes = isNaN(_minutes) ? 0 : _minutes;
    setMinutes((prev) => minutes.toString());
    return minutes;
  }

  const compute = (_minutes) => {
    return (eConstant ** ( -(deltaConstant / Tracers[isotope].constant) * _minutes)) * decay.value;
  }


  useEffect(() => {
    const t2 = (new Date(decay.datetimeMeasured)).getTime();
    const t1 = (autoDecay === true) ? (new Date().getTime()) : (new Date(decay.datetimeDesired)).getTime();
    const _minutes = minutesBetweenTwoDateTime(t1, t2);

      
      let _activity = (eConstant ** ( -(deltaConstant / Tracers[isotope].constant) * _minutes)) * decay.value;

    const activity = (decay.unit !== "Bq") 
      ? decay.unit === "GBq" 
        ? _activity * (10**9) 
        : _activity * (10**6)
      : _activity;
        
    setDecayCompute((prev) => activity);
  }, [decay, autoDecay, minutes, Tracers, isotope]);


  useEffect(() => {
    if (autoDecay === true && decay.datetimeMeasured.length > 0) {
      const interval = setInterval(() => {
        const t2 = (new Date(decay.datetimeMeasured)).getTime();
        const t1 = (new Date().getTime());
        minutesBetweenTwoDateTime(t1, t2);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoDecay, decay.datetimeMeasured, minutes]);

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        &nbsp;
        <h1 className='App-header-title'>Nuclear Decay</h1>
      </header>

      <div className='hr'/>

      <main className='App-main'>
        <form onSubmit={handleSubmit}>
          <div className='data'>

            <div>
              <h2>Date and Time</h2>
              <DateTime 
                label="Measured"
                name="datetimeMeasured"
                value={decay.datetimeMeasured} 
                onChange={handleChange}  />
              <br />
              <DateTime 
                label="Desired" 
                name="datetimeDesired"
                value={decay.datetimeDesired} 
                disabled={autoDecay}
                onChange={handleChange}  />
            </div>

            <div>
              <h2>Measured Activiy</h2>
              <MeasuredActivity 
                units={Units}
                activity={decay.value.toString()} 
                unit={decay.unit} 
                onChange={handleChange} />
              <br />
              <RadioIso isotopes={Tracers} isotope={isotope} onChange={handleIsotope} />
              <AutoDecay value={autoDecay} minutes={minutes} onChange={handleAutoDecayChange} />
            </div>

          </div>
        </form>
      </main>

      <div className='hr'/>

      <div className='App-footer'>
        <EstimatedActivity 
          activity={decayCompute} 
          unit={decay.unit}
          units={Units} />
      </div>

      <div className='hr'/>

      <footer className='footpage'>
        <small>(c)2022 Salim - PETScan Cyclotron ULB Erasme</small>
      </footer>

    </div>
  );
}

export default App;
