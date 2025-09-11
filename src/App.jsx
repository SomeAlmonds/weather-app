import { useEffect, useState } from "react";
import { Body } from "./components/body";
import Header from "./components/header";


const apiURL = "https://api.weatherapi.com/v1";
const apiKey = "65068712977b4a22b8c110604251009";

function App() {
  const [currentWeather, setCurrentWeather] = useState({})

  // get current weather info
  async function fetchCurrent(city) {

    if(!city){
      city = "cairo"
    }

    try {
      let resp = await fetch(
        `${apiURL}/current.json?key=${apiKey}&q=${city}`
      );
      if (!resp.ok) {
        throw new Error(`Somthing went wrong ERROR: ${resp.status}`);
      }
      resp = await resp.json();
      setCurrentWeather(resp);
      console.log(currentWeather);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => () => fetchCurrent(),[])

  return <>
  <Header fetchCurrent={fetchCurrent}/>
  <Body currentWeather={currentWeather}/>
  </>
}

export default App;
