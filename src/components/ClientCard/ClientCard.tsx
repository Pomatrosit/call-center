import { Dispatch, FC, SetStateAction } from "react";
import { Accordion, Form } from "react-bootstrap";
import FormikInput from "../FormikInput/FormikInput";
import classes from "./ClientCard.module.scss";

interface IProps {
  formik: any;
  sex: string;
  setSex: Dispatch<SetStateAction<string>>;
  individual: string;
  setIndividual: Dispatch<SetStateAction<string>>;
  isRegionClicked: boolean;
  setRegionClicked: Dispatch<SetStateAction<boolean>>;
  changeRegionId: (id: number) => void;
  regionId: number | null;
  isCityClicked: boolean;
  setCityClicked: Dispatch<SetStateAction<boolean>>;
  changeCityId: (id: number) => void;
}

const ClientCard: FC<IProps> = ({
  formik,
  sex,
  setSex,
  individual,
  setIndividual,
  isRegionClicked,
  setRegionClicked,
  changeRegionId,
  regionId,
  isCityClicked,
  setCityClicked,
  changeCityId,
}) => {
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Карточка клиента</Accordion.Header>
          <Accordion.Body>
            <FormikInput
              label="Фамилия"
              name="lastName"
              formik={formik}
              autoComplete="/api/autocomplete?"
              needValidate={false}
            />
            <FormikInput
              label="Имя"
              name="firstName"
              formik={formik}
              autoComplete="/api/autocomplete?"
              needValidate={false}
            />
            <FormikInput
              label="Отчество"
              name="middleName"
              formik={formik}
              autoComplete="/api/autocomplete?"
              needValidate={false}
            />
            <FormikInput
              label="Дата рождения"
              name="birthDate"
              formik={formik}
              type="date"
              needValidate={false}
            />
            <FormikInput
              label="Регион"
              name="region"
              formik={formik}
              autoComplete="/api/autocomplete?"
              isRegionClicked={isRegionClicked}
              setRegionClicked={setRegionClicked}
              changeRegionId={changeRegionId}
              needValidate={false}
            />
            <FormikInput
              label="Город"
              name="city"
              formik={formik}
              autoComplete={`/api/autocomplete?regionId=${regionId}&`}
              isCityClicked={isCityClicked}
              setCityClicked={setCityClicked}
              isRegionClicked={isRegionClicked}
              changeCityId={changeCityId}
              needValidate={false}
            />

            <div className={classes.formCheck}>
              <div className={classes.label}>Пол</div>
              <div>
                <Form.Check
                  type="radio"
                  label="М"
                  checked={sex === "male"}
                  onClick={() => setSex("male")}
                  onChange={() => {}}
                />
                <Form.Check
                  type="radio"
                  label="Ж"
                  checked={sex === "female"}
                  onClick={() => setSex("female")}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className={classes.formCheck}>
              <div className={classes.label}>Статус</div>
              <div>
                <Form.Check
                  type="radio"
                  label="Не ИП"
                  checked={individual === "not individual"}
                  onClick={() => setIndividual("not individual")}
                  onChange={() => {}}
                />
                <Form.Check
                  type="radio"
                  label="ИП"
                  checked={individual === "individual"}
                  onClick={() => setIndividual("individual")}
                  onChange={() => {}}
                />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {/* <Accordion.Item eventKey="1">
          <Accordion.Header>О клиенте</Accordion.Header>
          <Accordion.Body>Зарплата детей</Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
    </div>
  );
};

export default ClientCard;
