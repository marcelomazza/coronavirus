import React from 'react';
import './App.css';
import CovidChart from './CovidChart';
import CountrySelector from './CountrySelector';

function App() {
  return (
    <div>
      <h1>The Real COVID-19 curve</h1>
      <p>
        We got too used to see that drama-look exponential curve in COVID-19's
        evolution charts.
      </p>
      <p>
        This chart shows you the real COVID-19 progress over time.
      </p>
      <CovidChart />
      <CountrySelector />
    </div>
  );
}

export default App;
