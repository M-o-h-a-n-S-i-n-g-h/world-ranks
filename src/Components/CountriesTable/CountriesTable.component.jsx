import Link from "next/link";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading__arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading__arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};
const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

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
          {value === "name" && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading__population}
          onClick={() => switchDirectionAndValue("population")}
        >
          <div>Population </div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading__area}
          onClick={() => switchDirectionAndValue("area")}
        >
          <div>
            Area (km<sup>2</sup>)
          </div>
          {value === "area" && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading__gini}
          onClick={() => switchDirectionAndValue("gini")}
        >
          <div>Gini</div>
          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountries.map((country, index) => {
        return (
          <Link href={`/country/${country.alpha3Code}`} key={index}>
            <div className={styles.row}>
              <div className={styles.flag}>
                <img src={country.flag} alt={country.name} />
              </div>
              <div className={styles.name}>{country.name}</div>
              <div className={styles.population}> {country.population}</div>
              <div className={styles.area}> {country.area || 0}</div>
              <div className={styles.gini}> {country.gini || 0}%</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CountriesTable;
