import React, { useState } from 'react';
import ReactGA from 'react-ga';
import CountrySelectorStyles from "./CountrySelector.module.scss"

function CountrySelector({ countries, query, setQuery }) {
  const initialCountries = [
    'argentina',
    'brazil',
    'chile',
    'china',
    'france',
    'italy',
    'spain',
    'united-states',
    'united-kingdom',
    'uruguay'
  ];

  const [showInitialCountries, setshowInitialCountries] = useState(true);

  function CountryButton(props) {
    return (
      <li>
        <button
          onClick={() => {
            setQuery({ country: props.item.Slug });
            ReactGA.pageview(window.location.pathname + window.location.search);
          }}
          className={props.item.Slug === query.country ? CountrySelectorStyles.active : ''}>
          {props.item.Country}
        </button>
      </li>
    );
  }

  return (
    <div className={CountrySelectorStyles.container}>
      {query ? (
        <React.Fragment>
          <ul className={CountrySelectorStyles.list}>
            {showInitialCountries ? (
              countries.filter(country => initialCountries.includes(country.Slug)).map((item, i) => (
                <CountryButton key={i} item={item} />
              ))
            ) : (
              countries.map((item, i) => (
                <CountryButton key={i} item={item} />
              ))
            )}
          </ul>
          <div className={CountrySelectorStyles.fixed}>
            <button
              onClick={() => setshowInitialCountries(!showInitialCountries)}>
                {showInitialCountries ? (
                  'Show all countries'
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
