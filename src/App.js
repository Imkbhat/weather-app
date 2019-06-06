import React, { Component } from "react";
import "./App.css";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "4d763591719f77b1fe22cfe1bc2fff2f";

//URL : http://api.openweathermap.org/data/2.5/weather?q=London&mode=json&appid=4d763591719f77b1fe22cfe1bc2fff2f&units=metric
//Youtube : https://www.youtube.com/watch?v=204C9yNeOYI

class App extends Component {
  state = {
    temperature: undefined,
    humidity: undefined,
    city: undefined,
    country: undefined,
    description: undefined,
    error: undefined
  };

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&mode=json&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    if (city && country) {
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        humidity: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        error: "Please Enter the Value."
      });
    }
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    humidity={this.state.humidity}
                    country={this.state.country}
                    error={this.state.error}
                    description={this.state.description}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
