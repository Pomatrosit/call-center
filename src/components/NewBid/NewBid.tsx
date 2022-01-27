import { FC, useState } from "react";
import classes from "./NewBid.module.scss";
import BootstrapInput from "../BootstrapInput/BootstrapInput";
import { NEW_BIDS_FORM_CONTROLS } from "../../constants/newBid";
import { initialInputState } from "../../constants/initialInputState";
import { IFormControl } from "../../common-types/formControl";
import { STATUS_SELECT_OPTIONS } from "../../constants/statusSelectOptions";
import AutocompleteInput from "../AutocompleteInput/AutocompleteInput";

interface INewBidFormState {
  phone: IFormControl;
  firstName: IFormControl;
  lastName: IFormControl;
  middleName: IFormControl;
  status: IFormControl;
  birthDate: IFormControl;
  region: IFormControl;
  city: IFormControl;
}

const NewBid: FC = () => {
  const [form, setForm] = useState<INewBidFormState>({
    phone: initialInputState,
    firstName: initialInputState,
    lastName: initialInputState,
    middleName: initialInputState,
    status: {
      ...initialInputState,
      selectOptions: STATUS_SELECT_OPTIONS,
    },
    birthDate: initialInputState,
    region: initialInputState,
    city: initialInputState,
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
              value={String(
                form[formControl.name as keyof INewBidFormState].value
              )}
              setValue={handleChange}
              isError={form[formControl.name as keyof INewBidFormState].isError}
              errorMessage={
                form[formControl.name as keyof INewBidFormState].errorMessage
              }
              selectOptions={
                form[formControl.name as keyof INewBidFormState]
                  .selectOptions || null
              }
            />
          ))}
        </div>
        <div className={classes.rightSide}>
          <AutocompleteInput />
        </div>
      </div>
    </div>
  );
};

export default NewBid;
