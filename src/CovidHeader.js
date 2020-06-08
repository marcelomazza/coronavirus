import React from "react"
import covidHeaderStyles from "./CovidHeader.module.scss"

function CovidHeader() {
  return (
    <div className={covidHeaderStyles.covidHeader}>
      <h1>Normalized COVID-19 evolution by country</h1>
      <p className={covidHeaderStyles.subtitle}>
        Normalized COVID-19 progress over time,
        substracting recovered and death cases from confirmed cases.
      </p>
      <div className={covidHeaderStyles.author}>
        <p>
          Built by <a href="https://marcelomazza.com.ar/">Marce</a> with <a href="https://reactjs.org/">React</a> & <a href="https://covid19api.com/">covid19api.com</a>
        </p>
      </div>
    </div>
  );
}

export default CovidHeader;
