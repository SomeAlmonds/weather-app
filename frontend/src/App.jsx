import { useEffect, useState } from "react";
import { Body } from "./components/body";
import Header from "./components/header";

const apiURL = "https://api.weatherapi.com/v1";
const apiKey = "65068712977b4a22b8c110604251009";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState({});

  // this hook is for whether the temp is in fahrenheit or celcius, also used to toggle kph and mph
  // true for celcius/kph false for fahrenheit/mph
  const [tempToggle, setTempToggle] = useState(true);

  // get current weather and forecast info
  async function fetchCurrent(city) {
    if (!city) {
      // set default city to last searched city else to khartoum

      // TODO: get user location to set as default
      city = localStorage.getItem("city")
        ? localStorage.getItem("city")
        : "khartoum";
    }

    // // fetch current weather
    // try {
    //   let currentResp = await fetch(`${apiURL}/current.json?key=${apiKey}&q=${city}`);
    //   if (!currentResp.ok) {
    //     throw new Error(`Somthing went wrong ERROR: ${currentResp.status}`);
    //   }
    //   currentResp = await currentResp.json();
    //   setCurrentWeather(currentResp);
    // } catch (error) {
    //   console.warn(error);
    // }

    // fetch forecast also incluedes current weather obj so fetching from "/current.json" is not needed
    try {
      let forecastResp = await fetch(
        `http://localhost:3000/forecast?city=${city}`
      );
      if (!forecastResp.ok) {
        throw new Error(`Somthing went wrong ERROR: ${forecastResp.status}`);
      }
      forecastResp = await forecastResp.json();
      setForecast(forecastResp);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    console.log(forecast);
  }, [forecast]);

  useEffect(() => () => fetchCurrent(), []);

  return (
    <>
      <Header
        fetchCurrent={fetchCurrent}
        tempToggle={tempToggle}
        setTempToggle={setTempToggle}
      />
      <Body forecastObj={forecast} tempToggle={tempToggle} />
    </>
  );
}

export default App;
