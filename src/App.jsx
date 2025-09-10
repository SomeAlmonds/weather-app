import { Body } from "./components/body";
import Header from "./components/header";


const apiURL = "https://api.weatherapi.com/v1";
const apiKey = "65068712977b4a22b8c110604251009";

function App() {

  async function fetchCurrent(city) {

    try {
      let resp = await fetch(
        `${apiURL}/current.json?key=${apiKey}&q=${city}`
      );
      if (!resp.ok) {
        throw new Error(resp);
      }
      resp = await resp.json();
      console.log(resp);
    } catch (error) {
      console.warn(error);
    }
  }

  return <>
  <Header fetchCurrent={fetchCurrent}/>
  <Body />
  </>
}

export default App;
