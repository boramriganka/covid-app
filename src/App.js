import React from "react";
import Cards from "./Components/Cards/Cards";
import CountryPicker from "./Components/CountryPicker/CountryPicker";
import Chart from "./Components/Chart/Chart";
import styles from "./App.module.css";
import { fetchData } from "./api/api";
import coronaImage from "./images/image-3.jpg";
import LoadingMask from "react-loadingmask";
import axios from "axios";
import "./loader.css";
import "react-loadingmask/dist/react-loadingmask.css";
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
          <br />
          <text>
            <b>Global and Country Wise Cases of Corona Virus</b>
          </text>
          <br />
          <text>
            <i>(For a particular select a Country from below)</i>
          </text>
          <br />
          <br />
          <Cards data={data} country={country} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} />
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          {/**********7 different types of spinner using loader.css**********/}
            {/*GRADIENT SPINNER *
            <div class="spinner-box">
              <div class="circle-border">
                <div class="circle-core"></div>
              </div>
            </div>

            */}

            {/*<!-- SPINNER OoRBITS -->*/}
            <div class="spinner-box">
              <div class="blue-orbit leo"></div>

              <div class="green-orbit leo"></div>

              <div class="red-orbit leo"></div>

              <div class="white-orbit w1 leo"></div>
              <div class="white-orbit w2 leo"></div>
              <div class="white-orbit w3 leo"></div>
            </div>

            {/*<!-- GRADIENT CIRCLE PLANES -->*/}
            <div class="spinner-box">
              <div class="leo-border-1">
                <div class="leo-core-1"></div>
              </div>
              <div class="leo-border-2">
                <div class="leo-core-2"></div>
              </div>
            </div>

            {/*<!-- SPINNING SQUARES -->*/}

            <div class="spinner-box">
              <div class="configure-border-1">
                <div class="configure-core"></div>
              </div>
              <div class="configure-border-2">
                <div class="configure-core"></div>
              </div>
            </div>
          </div>
      );
    }
  }
}

export default App;
