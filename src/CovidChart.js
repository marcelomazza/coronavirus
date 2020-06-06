import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, XAxis, YAxis, Tooltip } from 'recharts';
import covidChartStyles from "./CovidChart.module.css"

function CovidChart({ country }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch("https://api.covid19api.com/total/country/" + country.Slug, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          // Discard dates without any cases
          const fromDayOne = result.filter((elem) => elem.Confirmed > 0);
          setItems(fromDayOne.map(function(d, i) {
            let delta = d.Confirmed - d.Recovered - d.Deaths;

            return {
              date: d.Date,
              delta: delta,
              confirmed: d.Confirmed,
            };
          }));
        }
      )
  }, [country]);

  return (
    <div className={covidChartStyles.container}>
      <h3 className={covidChartStyles.country}>{country.Country}</h3>
      <h4 className={covidChartStyles.firstCase}>First confirmed case: {items[0] ? items[0].date : ''}</h4>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={items} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <XAxis dataKey="date" style={{fontSize: '11px'}} />
          <YAxis style={{fontSize: '11px'}} />
          <CartesianGrid stroke="#30394C" strokeDasharray="5 5" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} wrapperStyle={{fontSize: "11px", color: "#A9ACB3"}}/>
          <Line type="basis" dataKey="confirmed" stroke="#30394C" strokeWidth={2} dot={false} />
          <Line type="basis" dataKey="delta" stroke="#21FF9F" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CovidChart;
