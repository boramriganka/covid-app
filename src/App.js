import React from "react";
import Cards from "./Components/Cards/Cards";
import CountryPicker from "./Components/CountryPicker/CountryPicker";
import Chart from "./Components/Chart/Chart";
import styles from "./App.module.css";
import { fetchData } from "./api/api";
import coronaImage from "./images/image-3.jpg";
import axios from "axios";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      country: "",
      isLoading: false,
    };
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
    // load the data
    axios.get("https://covid19.mathdro.id/api").then((response) =>
      setTimeout(
        function () {
          this.setState({
            isLoading: true,
          });
        }.bind(this),
        3000
      )
    );
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data, country } = this.state;
      return (
        <div className={styles.container}>
          <img className={styles.image} src={coronaImage} alt="COVID-19" />
          <br/>
          <text>
            <b>Global and Country Wise Cases of Corona Virus</b>
          </text>
          <br/>
          <text>
            <i>(For a particular select a Country from below)</i>
          </text>
          <br/>
          <br/>
          <Cards data={data} country={country} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} />
        </div>
  )
  }
}

export default App;
