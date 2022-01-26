import { FC, useState } from "react";
import classes from "./NewBid.module.scss";
import BootstrapInput from "../BootstrapInput/BootstrapInput";
import { NEW_BIDS_FORM_CONTROLS } from "../../constants/newBid";
import { initialInputState } from "../../constants/initialInputState";
import { IFormControl } from "../../common-types/formControl";

interface INewBidFormState {
  phone: IFormControl;
  firstName: IFormControl;
  lastName: IFormControl;
  middleName: IFormControl;
}

const NewBid: FC = () => {
  const [form, setForm] = useState<INewBidFormState>({
    phone: initialInputState,
    firstName: initialInputState,
    lastName: initialInputState,
    middleName: initialInputState,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: INewBidFormState) => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name as keyof INewBidFormState],
        value: e.target.value,
      },
    }));
  };

  return (
    <div className={classes.newBid}>
      <h4>Создание заявки</h4>
      <hr />
      <div className={classes.main}>
        <div className={classes.leftSide}>
          {NEW_BIDS_FORM_CONTROLS.map((formControl, idx) => (
            <BootstrapInput
              key={idx}
              label={formControl.label}
              name={formControl.name}
              type={formControl.type}
              value={String(form[formControl.name].value)}
              setValue={handleChange}
            />
          ))}
        </div>
        <div className={classes.rightSide}></div>
      </div>
    </div>
  );
};

export default NewBid;
