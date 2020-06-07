import React, { useState } from 'react';
import appStyles from "./App.module.css"
import Container from "./Container"
import CovidHeader from './CovidHeader';
import CovidChart from './CovidChart';
import CountrySelector from './CountrySelector';

function App() {
  const [country, setCountry] = useState({
    Country: 'China',
    Slug: 'china',
  });

  return (
    <Container>
      <CovidHeader />
      <div className={appStyles.container}>
        <CovidChart country={country} setCountry={setCountry} />
        <CountrySelector country={country} setCountry={setCountry} style={{ 'flexShrink': 1 }}/>
      </div>
    </Container>
  );
}

export default App;
