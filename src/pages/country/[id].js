import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout.component.jsx";
import styles from "./country.module.css";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await res.json();
  return country;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country.title}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview__panel}>
            <img src={country.flag} alt={country.name} />
            <div className={styles.overview_name}>{country.name}</div>
            <div>
              <h4 className={styles.overview_region}>{country.region}</h4>
            </div>
            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>{country.population}</div>
                <div className={styles.overview_label}>Population</div>
              </div>
              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>{country.capital}</div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_details}>Sub-region</div>
              <div className={styles.details_panel_value}>{country.subregion}</div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(",")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(",")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>{country.nativeName}</div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>{country.gini}</div>
            </div>

            <h3 className={styles.details_panel_label}>Neighboring Countries</h3>
            <div className={styles.details_panel_borders}>
              {borders.map(({ flag, name }, index) => {
                return (
                  <div className={styles.details_panel_borders_country} key={index}>
                    <img src={flag} alt={name} />
                    <div className={styles.details_panel_borders_name}>{name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Country;

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      country: await getCountry(params.id),
    },
  };
};
