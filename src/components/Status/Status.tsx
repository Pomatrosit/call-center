import { FC, useState } from "react"
import classes from "./Status.module.scss"
import AtworkIcon from "../Icons/AtWorkIcon"
import OnPauseIcon from "../Icons/OnPauseIcon"
import { Form } from "react-bootstrap"

const Status: FC = () => {
  const [status, setStatus] = useState<number>(1)

  const onChangeStatus = (e: any): void => {
    setStatus(+e.target.value)
  }

  let icon = <AtworkIcon />
  if (status === 2) icon = <OnPauseIcon />

  return (
    <div className={classes.status}>
      <div className={classes.status__icon}>{icon}</div>
      <Form.Select aria-label='Status' onChange={onChangeStatus} value={status}>
        <option value={1}>Работа</option>
        <option value={2}>Пауза</option>
      </Form.Select>
    </div>
  )
}

export default Status
