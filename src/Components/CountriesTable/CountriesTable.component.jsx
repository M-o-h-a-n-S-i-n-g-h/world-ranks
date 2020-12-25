import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";

const sortCountries = (countries, value, direction) => {
  if (direction === "desc") {
    return countries.sort((a, b) => (a[value] < b[value] ? 1 : -1));
  }
  if (direction === "asc") {
    return countries.sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
};

const SortTable = ({ direction }) => {
  if (!direction) {
    return <></>;
  } else if (direction === "desc") {
    return <KeyboardArrowUp color="inherit" />;
  } else {
    return <KeyboardArrowDown color="inherit" />;
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = sortCountries(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const switchDirectionAndValue = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div className={styles.country__container}>
      <div className={styles.heading}>
        <button
          className={styles.heading__name}
          onClick={() => switchDirectionAndValue("name")}
        >
          <div>Name</div>
          <SortTable direction={direction} />
        </button>
        <button
          className={styles.heading__population}
          onClick={() => switchDirectionAndValue("population")}
        >
          <div>Population </div>
          <SortTable direction={direction} />
        </button>
      </div>
      {orderedCountries.map((country, index) => {
        return (
          <div className={styles.row} key={index}>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}> {country.population}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CountriesTable;
