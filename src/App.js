import React from "react";
import Cards from "./components/Cards/Cards.jsx";
import Chart from "./components/Chart/Chart.jsx";
import CountryPicker from "./components/CountryPicker/CountryPicker.jsx";
import { fetchData } from "./api";
import ImageCorona from "./images/covid-19-4960254_1280.png";
import styles from "./App.module.css";

class App extends React.Component {
  state = { data: {}, country: "" };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country });
  };
  render() {
    const { data, country } = this.state;
    console.log(data);
    return (
      <div className={styles.container}>
        <img className={styles.image} alt="corona" src={ImageCorona} />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart
          data={data}
          confirmed={data.confirmed}
          deaths={data.deaths}
          recovered={data.recovered}
          lastUpdate={data.lastUpdate}
          country={country}
        />
      </div>
    );
  }
}
export default App;
