import React from "react";
import Cards from "./components/Cards/Cards.jsx";
import Chart from "./components/Chart/Chart.jsx";
import CountryPicker from "./components/CountryPicker/CountryPicker.jsx";
import { fetchData } from "./api";
import "./App.module.css";

class App extends React.Component {
  state = { data: {} };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div className={StyleSheet.container}>
        <Cards data={data} />
        <CountryPicker />
        <Chart />
      </div>
    );
  }
}
export default App;
