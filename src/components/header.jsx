import { useState } from "react";

const apiURL = "https://api.weatherapi.com/v1";
const apiKey = "65068712977b4a22b8c110604251009";

export default function Header({ fetchCurrent }) {
  const [searchResp, setSearchResp] = useState([]);


  async function fetchSearch(e) {
    const { value } = e.target;
    
    if (value) {
      // show city suggestions list if hidden
      const searchResults =
      document.getElementsByClassName("search-results")[0];
      
      if (searchResults.getAttribute("style")) {
        searchResults.removeAttribute("style", "display: none;");
      }
      
      // fetch cities
      try {
        let resp = await fetch(
          `${apiURL}/search.json?key=${apiKey}&q=${value}`
        );
        
        if (!resp.ok) {
          throw new Error(resp);
        }
        resp = await resp.json();
        
        // TODO: fix setState delay to get current suggestion list //

        // submit first suggestion if enter is pressed
        if (e.key === "Enter") {

          // TODO: fix this logical error: this makes it so that when enter is pressed
          // the city will allways be the firs on the list not the one selected
          handleSubmit(resp[0].name);
        }

        setSearchResp(resp);
      } catch (error) {
        console.warn(error);
      }
    } else {
      // hide suggestions list if search is empty
      const searchResults =
        document.getElementsByClassName("search-results")[0];
      searchResults.setAttribute("style", "display: none;");
    }
  }

  async function handleSubmit(city) {
    // hide suggestions after submit
    const searchResults = document.getElementsByClassName("search-results")[0];
    searchResults.setAttribute("style", "display: none;");
    // pass city name to fitch it's weather info
    if (city) {
      fetchCurrent(city);
    }
    // store city in local storage to load its weather next time page is loaded
    localStorage.setItem("city", city)
  }

  return (
    <div className="navbar">
      <div className="navbar-logo">WEATHER</div>
      <div className="searchbar">
        <input
          type="text"
          className="search"
          name="search"
          placeholder="Search locations..."
          autoComplete="off"
          onChange={(e) => fetchSearch(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchSearch(e);
          }}
        />
        <ul className="search-results">
          {searchResp.map((location) => {
            return (
              <li
                key={location.id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit(location.name);
                }}
                onClick={() => handleSubmit(location.name)}
              >
                <p>{location.name}</p>
                <p>{location.country}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
