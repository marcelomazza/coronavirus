import React, { useState, useEffect } from 'react';

function CountrySelector({ country, setCountry }) {
  // const [countries, setCountries] = useState([]);
  const [countries, setCountries] = useState([
    { Slug: 'argentina', Country: 'Argentina' },
    { Slug: 'brazil', Country: 'Brazil' },
    { Slug: 'chile', Country: 'Chile' },
    { Slug: 'france', Country: 'France' },
    { Slug: 'italy', Country: 'Italy' },
    { Slug: 'spain', Country: 'Spain' },
    { Slug: 'united-states', Country: 'United States' },
    { Slug: 'united-kingdom', Country: 'United Kingdom' },
    { Slug: 'uruguay', Country: 'Uruguay' },
  ]);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    from: '2020-03-01T00:00:00Z'
  };

  // useEffect(() => {
  //   fetch("https://api.covid19api.com/countries", requestOptions)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         console.log('then');
  //         console.log(result);
  //         setCountries(result.sort((a, b) => a.Country.localeCompare(b.Country)));
  //       }
  //     )
  // }, []);

  return (
    <ul style={{'textAlign': 'left', 'maxHeight': '600px', 'overflow': 'auto', 'listStyle': 'none'}}>
      {countries.map(item => (
        <li>
          <button onClick={() => setCountry(item.Slug)} style={{ backgroundColor: item.Slug == country ? 'yellow' : 'transparent'}}>
            {item.Country}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CountrySelector;
