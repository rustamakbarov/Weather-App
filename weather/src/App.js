import { useEffect, useState } from "react";
import "./App.css";

import search_icon from "./imgs/search.png";
import clear_icon from "./imgs/clear.png";
import cloud_icon from "./imgs/cloud.png";
import snow_icon from "./imgs/snow.png";
import rain_icon from "./imgs/rain.png";

let api = "dd94f859a0e52d6e4767fddf735f04a7";

function App() {
  const [city, setCity] = useState("");
  const [ready, setReady] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  async function handleClick() {
    if (city) {
      console.log(city);
      const currentData = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api}`
      );
      const currentDataJson = await currentData.json();
      if (currentDataJson.message === "city not found") {
        setError(true);
        setReady(false);
        return;
      }
      setReady(true);
      setError(false);
      setData(currentDataJson);
    } else {
      alert("Please enter the city name.");
    }
  }

  // useEffect(function () {
  //   function callback(e) {
  //     if (e.code === "Enter") {
  //       console.log(city);
  //       handleClick();
  //     }
  //   }

  //   document.addEventListener("keydown", callback);
  // });

  return (
    <div className="weather-wrapper">
      <div className="weather">
        <div className="weather-container">
          <div className="weather-title">
            <img src={cloud_icon} alt="Cloud" />
            <h1>Weather</h1>
          </div>

          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Search city"
              onChange={(e) => setCity(e.target.value)}
            />

            <button onClick={handleClick} className="search-button">
              <img src={search_icon} alt="Search" />
            </button>
          </div>

          {ready && <Days data={data} />}
          {error && <Error />}
        </div>
      </div>
    </div>
  );
}

function Days({ data }) {
  console.log(data.weather);

  return (
    <div className="days">
      <div className="day-weather">
        <span className="weather-icon">
          {data.weather[0].main === "Clear" && (
            <img src={clear_icon} alt="clear weather" />
          )}

          {data.weather[0].main === "Clouds" && (
            <img src={cloud_icon} alt="cloudly weather" />
          )}

          {data.weather[0].main === "Rain" && (
            <img src={rain_icon} alt="rainy weather" />
          )}

          {data.weather[0].main === "Snow" && (
            <img src={snow_icon} alt="snow weather" />
          )}
        </span>
        <span className="temprature">
          <strong>{data.main.temp.toFixed(0)}</strong>ºc
        </span>
      </div>
    </div>
  );
}

function Error() {
  return (
    <div className="error-wrapper">
      <p className="error">
        Something went wrong. Please enter the valid city name.*
      </p>
    </div>
  );
}

export default App;
