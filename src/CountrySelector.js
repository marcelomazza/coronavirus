import React, { useState, useEffect } from 'react';
import CountrySelectorStyles from "./CountrySelector.module.scss"

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
        <ul className={CountrySelectorStyles.list}>
          {showSelectedCountries ? (
            selectedCountries.map((item, i) => (
              <li key={i}>
                <button onClick={() => setCountry(item)} className={item.Slug === country.Slug ? CountrySelectorStyles.active : ''}>
                  {item.Country}
                </button>
              </li>
            ))
          ) : (
            apiCountries.map((item, i) => (
              <li key={i}>
                <button onClick={() => setCountry(item)} className={item.Slug === country.Slug ? CountrySelectorStyles.active : ''}>
                  {item.Country}
                </button>
              </li>
            ))
          )}
          <li>
            <button onClick={() => setshowSelectedCountries(!showSelectedCountries)}>More countries...</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default CountrySelector;
