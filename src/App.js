import React from 'react';
import { useQueryParams, StringParam, withDefault } from 'use-query-params';
import "./App.scss"
import Container from "./Container"
import CovidHeader from './CovidHeader';
import CovidChart from './CovidChart';
import CountrySelector from './CountrySelector';

function App() {
  const [country, setCountry] = useQueryParams({
    Slug: withDefault(StringParam, 'china'),
    Country: withDefault(StringParam, 'China')
  });

  return (
    <Container>
      <CovidHeader />
      <CovidChart country={country} />
      <CountrySelector country={country} setCountry={setCountry} style={{ 'flexShrink': 1 }}/>
    </Container>
  );
}

export default App;
