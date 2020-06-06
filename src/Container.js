import React from "react"
import containerStyles from "./Container.module.css"

export default ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
)
