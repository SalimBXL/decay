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
  const [decay, setDecay] = useState({
    datetimeMeasured: "",
    datetimeDesired: "",
    value: 0, 
    unit: Units[0].name
  });
  

  const handleChange = ({name, value}) => {setDecay(values => ({...values, [name]: value}));}
  const handleAutoDecayChange = () => setAutoDecay(prev => !prev);
  const handleSubmit = (event) => event.preventDefault();

  const minutesBetweenTwoDateTime = (t1, t2) => {
    const _minutes = Math.floor( (t1 - t2) / 1000 / 60 );
    const minutes = isNaN(_minutes) ? 0 : _minutes;
    return minutes;
  }

  useEffect(() => {
    const t1 = (new Date(decay.datetimeDesired)).getTime();
    const t2 = autoDecay === true
      ? (new Date()).getTime() 
      : (new Date(decay.datetimeMeasured)).getTime();
    const minutes = minutesBetweenTwoDateTime(t1, t2);
    const computeActivity = (minutes) => {
      let _activity = (CON ** minutes) * decay.value;
      const activity = (decay.unit !== "Bq") 
        ? decay.unit === "GBq" 
          ? _activity * (10**9) 
          : _activity * (10**6)
        : _activity;
        return activity;
    }
    const activity = computeActivity(minutes);
    setDecayCompute((prev) => activity);
  }, [decay, autoDecay]);

  useEffect(() => {
    console.log("AutoDecay : ", autoDecay, "  t2 : ");
  }, [autoDecay]);
  
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
                value={decay.datetimeMeasured} 
                onChange={handleChange} 
                name="datetimeMeasured" />
              <br />
              <DateTime 
                label="Desired" 
                value={decay.datetimeDesired} 
                enable={decay.datetimeDesiredEnable}
                onChange={handleChange} 
                name="datetimeDesired" />
            </div>

            <div>
              <h2>Measured Activiy</h2>
              <MeasuredActivity 
                units={Units}
                activity={decay.value.toString()} 
                unit={decay.unit} 
                onChange={handleChange} />
              <br />
              <AutoDecay value={autoDecay} onChange={handleAutoDecayChange} />
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
