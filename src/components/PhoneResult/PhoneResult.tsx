import { FC, useState } from "react";
import { changeWebPhoneStatus } from "../../helpers/webPhone";
import { useAppSelector } from "../../hooks/useAppSelector";
import classes from "./PhoneResult.module.scss";

interface IProps {
  direction?: string;
}

const PhoneResult: FC<IProps> = ({ direction }) => {
  const [isRootOpen, setRootOpen] = useState<boolean>(false);
  const options = useAppSelector((state) => state.webPhone.phoneResults);
  const [activeOption, setActiveOption] = useState<number>(-1);

  const dropdownClickHandler = (e: any) => {
    if (!e.target.closest(`.${classes.rootOption}`)) {
      setRootOpen((prev) => !prev);
    }
  };

  const rootOptionMouseEnter = (category: string) => {
    const activeOption = options.findIndex(
      (option: any) => option.nameCategory === category
    );
    setActiveOption(activeOption);
  };

  const rootOptionsMouseLeave = () => {
    setActiveOption(-1);
  };

  const rootOptionsClasses = [classes.rootOptions];
  if (direction === "top") rootOptionsClasses.push(classes.rootOptionsTop);
  else rootOptionsClasses.push(classes.rootOptionsBottom);

  const callResultClickHandler = (id: number) => {
    console.log(id);
    changeWebPhoneStatus("wait");
  };

  return (
    <div className={classes.root}>
      {isRootOpen && (
        <div
          className={classes.layout}
          onClick={(e) => dropdownClickHandler(e)}
        ></div>
      )}
      <div
        className={classes.dropdown}
        onClick={(e) => dropdownClickHandler(e)}
      >
        <span className={classes.title}>Результат звонка</span>
        {isRootOpen && (
          <div
            className={rootOptionsClasses.join(" ")}
            onMouseLeave={rootOptionsMouseLeave}
          >
            {options.map((option: any) => (
              <div
                key={option.nameCategory}
                className={classes.rootOption}
                onMouseEnter={() => rootOptionMouseEnter(option.nameCategory)}
              >
                <span>{option.nameCategory}</span>
              </div>
            ))}
            {activeOption !== -1 && (
              <div
                className={classes.innerOptions}
                style={{ top: activeOption * 2 + "vmax" }}
              >
                {options[activeOption].statuses.map((innerOption: any) => (
                  <div
                    key={innerOption.id}
                    className={classes.innerOption}
                    onClick={() => callResultClickHandler(innerOption.id)}
                  >
                    {innerOption.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneResult;
