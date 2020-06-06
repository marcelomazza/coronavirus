import React from "react"
import covidHeaderStyles from "./CovidHeader.module.css"

function CovidHeader() {
  return (
    <div className={covidHeaderStyles.covidHeader}>
      <h1>The Real COVID-19 curve</h1>
      <p>
        We got too used to see the exponential drama-looking curve in
        almost every COVID-19's evolution charts.
        <br />
        This chart shows you the real COVID-19 progress over time, taking
        recovered cases into account.
      </p>
    </div>
  );
}

export default CovidHeader;
