import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './App.css';

const data = [
  {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 500, pv: 3200, amt: 3200},
  {name: 'Page C', uv: 200, pv: 1200, amt: 1200}
];

const renderLineChart = (
  <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
);

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);

  console.log(items);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    from: '2020-03-01T00:00:00Z'
  };

  // fetch("https://api.covid19api.com/country/south-africa/status/confirmed", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    let mappedResult1;
    // Get list of countries
    fetch("https://api.covid19api.com/total/country/italy", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('then');
          console.log(result);
          setIsLoaded(true);
          mappedResult1 = result.map(function(d, i) {
            let delta = d.Confirmed - d.Recovered - d.Deaths;

            return {
              date: d.Date,
              chinaDelta: delta,
            };
          });

          lastOne();
          // setItems(mappedResult);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )

    let mappedResult2;

    function lastOne() {
      // Get list of countries
      fetch("https://api.covid19api.com/total/country/argentina", requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            console.log('then');
            console.log(result);
            setIsLoaded(true);
            mappedResult2 = result.map(function(d, i) {
              let delta = d.Confirmed - d.Recovered - d.Deaths;

              console.log('mappedResult1 item');
              console.log(mappedResult1[i]);
              
              return {
                date: d.Date,
                argentinaDelta: delta,
                chinaDelta: mappedResult1[i].chinaDelta,
              };
            });
            console.log('mappedResult1 china');
            console.log(mappedResult1);
            console.log('mappedResult2 argentina');
            console.log(mappedResult2);
            // console.log('combined');
            // console.log([...mappedResult1, ...mappedResult2]);
            setItems(mappedResult2);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }

  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <LineChart width={900} height={600} data={items} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="basis" dataKey="chinaDelta" stroke="yellow" dot={false} />
              <Line type="basis" dataKey="argentinaDelta" stroke="#dd2c00" dot={false} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </p>
          <ul>
            {items.map(item => (
              <li key={item.index}>
                {item.date} - {item.cases}
              </li>
            ))}
          </ul>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
