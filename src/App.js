import React, { useState } from 'react';
import './App.css';
import CovidChart from './CovidChart';
import CountrySelector from './CountrySelector';

function App() {
  const [country, setCountry] = useState('argentina');

  return (
    <div>
      <h1>The Real COVID-19 curve</h1>
      <p>
        We got too used to see the exponential drama-looking in COVID-19's
        evolution charts.
      </p>
      <p>
        This chart shows you the real COVID-19 progress over time.
      </p>
      <div style={{'display': 'flex'}}>
        <CovidChart country={country} setCountry={setCountry} />
        <CountrySelector country={country} setCountry={setCountry} style={{ 'flexShrink': 1 }}/>
      </div>
    </div>
  );
}

export default App;
