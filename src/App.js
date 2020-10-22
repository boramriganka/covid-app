import React from "react";
import Cards from "./Components/Cards/Cards";
import CountryPicker from "./Components/CountryPicker/CountryPicker";
import Chart from "./Components/Chart/Chart";
import styles from "./App.module.css";
import { fetchData } from "./api/api";
import coronaImage from "./images/image-3.jpg";
import axios from "axios";
import "./loader.css";
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
    if (this.state.isLoading) {
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
      );
    } else {
      return (
        <div className={styles.container}>
       
            <div className="spinner-box">
              <div className="blue-orbit leo"></div>

              <div className="green-orbit leo"></div>

              <div className="red-orbit leo"></div>

              <div className="white-orbit w1 leo"></div>
              <div className="white-orbit w2 leo"></div>
              <div className="white-orbit w3 leo"></div>
            </div>

            <div className="spinner-box">
              <div className="leo-border-1">
                <div className="leo-core-1"></div>
              </div>
              <div className="leo-border-2">
                <div className="leo-core-2"></div>
              </div>
            </div>


            <div className="spinner-box">
              <div className="configure-border-1">
                <div className="configure-core"></div>
              </div>
              <div className="configure-border-2">
                <div className="configure-core"></div>
              </div>
            </div>
          </div>
      );
    }
  }
}

export default App;
