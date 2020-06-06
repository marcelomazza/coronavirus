import React, { useState, useEffect } from 'react';

function CountrySelector({ country, setCountry }) {
  const selectedCountries = [
    { Slug: 'argentina', Country: 'Argentina' },
    { Slug: 'brazil', Country: 'Brazil' },
    { Slug: 'chile', Country: 'Chile' },
    { Slug: 'china', Country: 'China' },
    { Slug: 'france', Country: 'France' },
    { Slug: 'italy', Country: 'Italy' },
    { Slug: 'spain', Country: 'Spain' },
    { Slug: 'united-states', Country: 'United States' },
    { Slug: 'united-kingdom', Country: 'United Kingdom' },
    { Slug: 'uruguay', Country: 'Uruguay' },
  ];

  const [apiCountries, setApiCountries] = useState([]);
  const [showSelectedCountries, setshowSelectedCountries] = useState(true);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      from: '2020-03-01T00:00:00Z'
    };

    fetch("https://api.covid19api.com/countries", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setApiCountries(result.sort((a, b) => a.Country.localeCompare(b.Country)));
        }
      )
  }, []);

  return (
    <div>
      {country ? (
        <ul style={{textAlign: 'left', maxHeight: '600px', overflow: 'auto', listStyle: 'none', position: 'absolute', top: '100px', right:  '-120px' }}>
          {showSelectedCountries ? (
            selectedCountries.map((item, i) => (
              <li key={i} style={{ margin: '0.25em' }}>
                <button onClick={() => setCountry(item)} style={{ backgroundColor: item.Slug === country.Slug ? '#F68A1D' : '#A9ACB3', border: 'none', color: '#FFF', padding: '1em'}}>
                  {item.Country}
                </button>
              </li>
            ))
          ) : (
            apiCountries.map((item, i) => (
              <li key={i} style={{ margin: '0.25em' }}>
                <button onClick={() => setCountry(item)} style={{ backgroundColor: item.Slug === country.Slug ? '#F68A1D' : '#A9ACB3', border: 'none', color: '#FFF', padding: '1em'}}>
                  {item.Country}
                </button>
              </li>
            ))
          )}
          <li style={{ margin: '0.25em' }}>
            <button onClick={() => setshowSelectedCountries(!showSelectedCountries)} style={{ backgroundColor: '#A9ACB3', border: 'none', color: '#FFF', padding: '1em'}}>More countries...</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default CountrySelector;
