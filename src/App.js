import React, { useState, useEffect } from 'react';
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

  const [apiCountries, setApiCountries] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      from: '2020-03-01T00:00:00Z',
    };

    fetch("https://api.covid19api.com/countries", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setApiCountries(result.sort((a, b) => a.Country.localeCompare(b.Country)));
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
  }, []);


  return (
    <Container>
      <CovidHeader />
      <CovidChart country={country} />
      <CountrySelector country={country} apiCountries={apiCountries} setCountry={setCountry} style={{ 'flexShrink': 1 }}/>
    </Container>
  );
}

export default App;
