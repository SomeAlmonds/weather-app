import { useEffect, useState } from "react";
import { Body } from "./components/body";
import Header from "./components/header";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [forecast, setForecast] = useState({});

  // this hook is for whether the temp is in fahrenheit or celcius, also used to toggle kph and mph
  // true for celcius/kph false for fahrenheit/mph
  const [tempToggle, setTempToggle] = useState(true);

  // get current weather and forecast info
  async function fetchCurrent(city) {
    if (!city) {
      // set default city to last searched city else to khartoum
      city = localStorage.getItem("city")
        ? localStorage.getItem("city")
        : "khartoum";
    }

    // fetch forecast also incluedes current weather obj so fetching from "/current.json" is not needed
    try {
      let forecastResp = await fetch(
        `https://weather-app-backend-pi.vercel.app/api/forecast?city=${city}`
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
    fetchCurrent();
  }, []);

  return (
    <>
      <Analytics />
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
