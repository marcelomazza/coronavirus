import React, { useState } from 'react';
import "./App.scss"
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
      <CovidChart country={country} setCountry={setCountry} />
      <CountrySelector country={country} setCountry={setCountry} style={{ 'flexShrink': 1 }}/>
    </Container>
  );
}

export default App;
