import React from "react"
import covidHeaderStyles from "./CovidHeader.module.css"

function CovidHeader() {
  return (
    <div className={covidHeaderStyles.covidHeader}>
      <h1>Normalized COVID-19 evolution by country</h1>
      <p>
        We got too used to see the exponential drama-looking curve in
        almost every COVID-19's evolution charts.
        <br />
        This chart shows you the normalized COVID-19 progress over time,
        substracting recovered cases from confirmed cases.
      </p>
    </div>
  );
}

export default CovidHeader;
