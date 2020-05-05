import React, { useState, useEffect } from 'react';

function CountrySelector() {
  const [countries, setCountries] = useState([]);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    from: '2020-03-01T00:00:00Z'
  };

  useEffect(() => {
    fetch("https://api.covid19api.com/countries", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('then');
          console.log(result);
          setCountries(result.sort((a, b) => a.Country.localeCompare(b.Country)));
        }
      )
  }, []);

  return (
    <ul style={{'textAlign': 'left'}}>
      {countries.map(country => (
        <li>{country.Country}</li>
      ))}
    </ul>
  );
}

export default CountrySelector;
