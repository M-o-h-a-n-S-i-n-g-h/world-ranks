import Layout from "../Components/Layout/Layout.component";
import SearchInput from "../Components/SearchInput/SearchInput.component.jsx";
import CountriesTable from "../Components/CountriesTable/CountriesTable.component";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(keyword)
  );

  return (
    <Layout>
      <div className={styles.count}>Found {countries.length} countries from the API</div>
      <SearchInput
        placeholder="Filter Input By Name,Region or Sub-Region"
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
  
      />
      <CountriesTable countries={filteredCountries || countries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
