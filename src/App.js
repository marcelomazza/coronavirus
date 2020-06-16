import React, { useState, useEffect } from 'react';
import { useQueryParams, StringParam, withDefault } from 'use-query-params';
import "./App.scss"
import Container from "./Container"
import CovidHeader from './CovidHeader';
import CovidChart from './CovidChart';
import CountrySelector from './CountrySelector';

function App() {
  const [query, setQuery] = useQueryParams({
    country: withDefault(StringParam, 'china')
  });

  const [countries, setCountries] = useState([]);

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
          const sortedCountries = result.sort((a, b) => a.Country.localeCompare(b.Country));
          setCountries(sortedCountries);
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      );

  }, []);


  return (
    <Container>
      <CovidHeader />
      <CovidChart countries={countries} query={query} />
      <CountrySelector countries={countries} query={query} setQuery={setQuery} style={{ 'flexShrink': 1 }}/>
    </Container>
  );
}

export default App;
