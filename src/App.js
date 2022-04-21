import logo from './logo512.png';
import { useState, useEffect } from 'react';
import DateTime from './form/DateTime';
import MeasuredActivity from "./form/MeasuredActivity";
import EstimatedActivity from './EstimatedActivity';
import './App.css';

function App() {

  const CON = 0.993707;

  const Units = [
    {name: "GBq", coeff: (10**9)},
    {name: "MBq", coeff: (10**6)},
    {name: "Bq", coeff: 1}
  ];

  const [decay, setDecay] = useState({
    datetimeMeasured: "",
    datetimeDesired: "",
    value: 0, 
    unit: Units[0].name
  });

  const [decayCompute, setDecayCompute] = useState();

  useEffect(() => {
    
    const t1 = (new Date(decay.datetimeDesired)).getTime();
    const t2 = (new Date(decay.datetimeMeasured)).getTime();
    const _minutes = Math.floor( (t1 - t2) / 1000 / 60 );
    const minutes = isNaN(_minutes) ? 0 : _minutes;

    let _activity = (CON ** minutes) * decay.value;

    _activity = (decay.unit !== "Bq") 
      ? decay.unit === "GBq" ? _activity * (10**9) : _activity * (10**6)
      : _activity;
    setDecayCompute((prev) => _activity);
  }, [decay]);
  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDecay(values => ({
      ...values, 
      [name]: value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }


  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        &nbsp;
        <h1 className='App-header-title'>Nuclear Decay</h1>
      </header>

      <hr />

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
              
            </div>
          </div>
        </form>
      </main>

      <hr />

      <footer className='App-footer'>
        <EstimatedActivity 
          activity={decayCompute} 
          unit={decay.unit}
          units={Units} />
      </footer>
    </div>
  );
}

export default App;
