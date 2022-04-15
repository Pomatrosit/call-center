import { useState } from "react";
import classes from "./PhoneResult.module.scss";

const PhoneResult = () => {
  const [isRootOpen, setRootOpen] = useState<boolean>(false);
  const [options, setOptions] = useState([
    {
      category: "Нецелевой",
      options: [
        { id: 1, title: "Ребенок" },
        { id: 2, title: "Пенсионер" },
        { id: 3, title: "Студент" },
      ],
    },
    {
      category: "Сброс",
      options: [
        { id: 1, title: "Автоответчик" },
        { id: 2, title: "Тишина" },
        { id: 3, title: "Разрыв связи" },
      ],
    },
  ]);
  const [activeOption, setActiveOption] = useState<number>(-1);

  const dropdownClickHandler = (e: any) => {
    if (!e.target.closest(`.${classes.rootOption}`)) {
      setRootOpen((prev) => !prev);
    }
  };

  const rootOptionMouseEnter = (category: string) => {
    const activeOption = options.findIndex(
      (option) => option.category === category
    );
    setActiveOption(activeOption);
  };

  const rootOptionsMouseLeave = () => {
    setActiveOption(-1);
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
            className={classes.rootOptions}
            onMouseLeave={rootOptionsMouseLeave}
          >
            {options.map((option) => (
              <div
                key={option.category}
                className={classes.rootOption}
                onMouseEnter={() => rootOptionMouseEnter(option.category)}
              >
                <span>{option.category}</span>
              </div>
            ))}
            {activeOption !== -1 && (
              <div
                className={classes.innerOptions}
                style={{ top: activeOption * 3.5 + "vh" }}
              >
                {options[activeOption].options.map((innerOption) => (
                  <div key={innerOption.id} className={classes.innerOption}>
                    {innerOption.title}
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
