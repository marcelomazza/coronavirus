import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function CovidChart({ country }) {
  const [items, setItems] = useState([]);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    from: '2020-03-01T00:00:00Z'
  };

  useEffect(() => {
    console.log('country');
    console.log(country);
    fetch("https://api.covid19api.com/total/country/" + country, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('CovidChart result');
          console.log(result);
          setItems(result.map(function(d, i) {
            let delta = d.Confirmed - d.Recovered - d.Deaths;

            return {
              date: d.Date,
              delta: delta,
            };
          }));
        }
      )
  }, [country]);

  return (
      <LineChart width={900} height={600} data={items} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="basis" dataKey="delta" stroke="green" dot={false} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
  );
}

export default CovidChart;
