import React, { useState } from 'react';
import CountrySelectorStyles from "./CountrySelector.module.scss"

function CountrySelector({ country, setCountry, apiCountries }) {
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

  const [showSelectedCountries, setshowSelectedCountries] = useState(true);

  return (
    <div className={CountrySelectorStyles.container}>
      {country ? (
        <React.Fragment>
          <ul className={CountrySelectorStyles.list}>
            {showSelectedCountries ? (
              selectedCountries.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => setCountry( {Slug: item.Slug, Country: item.Country}) }
                    className={item.Slug === country.Slug ? CountrySelectorStyles.active : ''}>
                    {item.Country}
                  </button>
                </li>
              ))
            ) : (
              apiCountries.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => setCountry({ Slug: item.Slug, Country: item.Country })}
                    className={item.Slug === country.Slug ? CountrySelectorStyles.active : ''}>
                    {item.Country}
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className={CountrySelectorStyles.fixed}>
            <button
              onClick={() => setshowSelectedCountries(!showSelectedCountries)}>
                {showSelectedCountries ? (
                  'Show more countries'
                ) : (
                  'Show less'
                )}
            </button>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default CountrySelector;
