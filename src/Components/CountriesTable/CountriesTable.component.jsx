import {
  KeyboardArrowDown,
  KeyboardArrowDownRounded,
  KeyboardArrowUp,
} from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";

const sortCountries = (countries, direction) => {
  if (direction === "desc") {
    return countries.sort((a, b) => (a.population < b.population ? 1 : -1));
  }
  if (direction === "asc") {
    return countries.sort((a, b) => (a.population > b.population ? 1 : -1));
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

  const orderedCountries = sortCountries(countries, "desc");

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  return (
    <div className={styles.country__container}>
      <div className={styles.heading}>
        <button className={styles.heading__name} onClick={switchDirection}>
          <div>Name</div>
          <SortTable direction={direction} />
        </button>
        <button className={styles.heading__population}>
          <div>Population </div>
          {/* <SortTable direction={direction} /> */}
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
