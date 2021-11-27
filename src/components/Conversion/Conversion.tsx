import React, { FC } from "react"
import classes from "./Conversion.module.scss"
import { ProgressBar } from "react-bootstrap"

interface IConversionProps {
  currentValue: number
  maxValue: number
  title: string
}

const Conversion: FC<IConversionProps> = ({
  currentValue,
  maxValue,
  title,
}) => {
  let percent = currentValue / maxValue
  if (percent < 0) percent = 0

  let progressVariant = "danger"

  if (percent > 0.33 && percent < 0.66) progressVariant = "warning"
  else if (percent >= 0.66) progressVariant = "success"

  return (
    <div className={classes.conversion}>
      <p className={classes.convertionTitle}>
        <span>{title}: </span>
        <span className={classes.currentTitle}>{currentValue}</span> из{" "}
        <span className={classes.maxTitle}>{maxValue}</span> заявок
      </p>
      <div className={classes.convertionWrapper}>
        <ProgressBar
          striped
          variant={progressVariant}
          now={Math.ceil(percent * 100)}
        />
      </div>
    </div>
  )
}

export default Conversion
