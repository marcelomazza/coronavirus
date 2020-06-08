import React from "react"
import containerStyles from "./Container.module.scss"

export default ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
)
