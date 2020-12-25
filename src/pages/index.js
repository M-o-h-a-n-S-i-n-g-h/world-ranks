import Layout from "../Components/Layout/Layout.component";
import SearchInput from "../Components/SearchInput/SearchInput.component.jsx";
import CountriesTable from "../Components/CountriesTable/CountriesTable.component";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  return (
    <Layout>
      <div className={styles.count}>
        Found {countries.length} countries from the API
      </div>
      <SearchInput placeholder="Filter Input By Name,Region or Sub-Region" />
      <CountriesTable countries={countries} />
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
