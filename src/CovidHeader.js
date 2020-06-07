import React from "react"
import covidHeaderStyles from "./CovidHeader.module.scss"

function CovidHeader() {
  return (
    <div className={covidHeaderStyles.covidHeader}>
      <h1>Normalized COVID-19 evolution by country</h1>
      <p>
        Normalized COVID-19 progress over time,
        substracting recovered and death cases from confirmed cases.
      </p>
    </div>
  );
}

export default CovidHeader;
