import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, XAxis, YAxis, Tooltip } from 'recharts';
import covidChartStyles from "./CovidChart.module.scss"

function CovidChart({ country }) {
  const [items, setItems] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const legendStyle = {
    right: 0,
    fontSize: '11px',
    color: '#A9ACB3',
  }

  const itemStyle = {
    color: 'white',
    fontSize: '0.8rem',
  }

  const wrapperStyle = {
    backgroundColor: 'transparent',
  }

  const contentStyle = {
    border: '0',
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(rgba(71, 84, 113, 0.8), rgba(48, 57, 76, 0.8))',
  }

  const labelStyle = {
    marginBottom: '0.75rem',
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setNoResults(false);

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch("https://api.covid19api.com/total/country/" + country.Slug, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.length === 0) {
            setNoResults(true);
          }

          // Discard dates without any cases
          const fromDayOne = result.filter((elem) => elem.Confirmed > 0);
          setItems(fromDayOne.map(function(d, i) {
            const active = d.Confirmed - d.Recovered - d.Deaths;
            const parsedDate = Date.parse(d.Date);
            const formattedDate = new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric"
            }).format(parsedDate);

            return {
              formattedDate: formattedDate,
              active: active,
              confirmed: d.Confirmed,
              deaths: d.Deaths,
              recovered: d.Recovered,
            };
          }));
        }
      )
  }, [country]);

  return (
    <div className={covidChartStyles.covidChart}>
      <div className={covidChartStyles.header}>
        <h3 className={covidChartStyles.country}>{country.Country}</h3>
        <h4 className={covidChartStyles.firstCase}>
          First case:
          <span className={covidChartStyles.firstDate}>
            {items[0] ? items[0].formattedDate : ''}
          </span>
        </h4>
      </div>
      {noResults ? (
        <div className={covidChartStyles.noResults}>
          Sorry, no results for {country.Country}
        </div>
      ) : null}
      <ResponsiveContainer className={covidChartStyles.chart} width="100%">
        <LineChart data={items} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <XAxis dataKey="formattedDate" style={{fontSize: '11px'}} />
          <YAxis style={{fontSize: '11px'}} />
          <CartesianGrid stroke="#30394C" strokeDasharray="5 5" />
          <Tooltip itemStyle={itemStyle} wrapperStyle={wrapperStyle} contentStyle={contentStyle} labelStyle={labelStyle}/>
          <Legend verticalAlign="top" height={36} wrapperStyle={legendStyle} />
          <Line type="basis" dataKey="confirmed" name="Confirmed" stroke="#30394C" strokeWidth={2} dot={false} />
          <Line type="basis" dataKey="deaths" name="Deaths" stroke="#742A1B" strokeWidth={2} dot={false} />
          <Line type="basis" dataKey="recovered" name="Recovered" stroke="#1B5F5B" strokeWidth={2} dot={false} />
          <Line type="basis" dataKey="active" name="Active Cases" stroke="#21FF9F" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CovidChart;
