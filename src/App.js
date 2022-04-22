import logo from './logo512.png';
import { useState, useEffect } from 'react';
import DateTime from './form/DateTime';
import MeasuredActivity from "./form/MeasuredActivity";
import AutoDecay from "./form/AutoDecay";
import EstimatedActivity from './EstimatedActivity';
import './App.css';

function App() {

  const CON = 0.993707;
  const Units = [
    {name: "GBq", coeff: (10**9)},
    {name: "MBq", coeff: (10**6)},
    {name: "Bq", coeff: 1}
  ];
  const [decayCompute, setDecayCompute] = useState();
  const [autoDecay, setAutoDecay] = useState(false);
  const [minutes, setMinutes] = useState("");
  const [decay, setDecay] = useState({
    datetimeMeasured: "",
    datetimeDesired: "",
    value: 0, 
    unit: Units[0].name
  });
  

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

  useEffect(() => {
    const t2 = (new Date(decay.datetimeMeasured)).getTime();
    const t1 = (autoDecay === true) ? (new Date().getTime()) : (new Date(decay.datetimeDesired)).getTime();
    const _minutes = minutesBetweenTwoDateTime(t1, t2);
    
      let _activity = (CON ** _minutes) * decay.value;
      const activity = (decay.unit !== "Bq") 
        ? decay.unit === "GBq" 
          ? _activity * (10**9) 
          : _activity * (10**6)
        : _activity;
        
    setDecayCompute((prev) => activity);
  }, [decay, autoDecay, minutes]);

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
