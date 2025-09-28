import { useState } from "react";
import { icons } from "../assets/assets";

export default function Header({ fetchCurrent, tempToggle, setTempToggle }) {
  const [searchResp, setSearchResp] = useState([]);

  async function fetchSearch(e) {
    // this function is for getting the suggestions for the search bar

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
        let resp = await fetch(`http://localhost:3000/search?input=${value}`);

        if (!resp.ok) {
          throw new Error(resp);
        }
        resp = await resp.json();

        // submit first suggestion if enter is pressed
        if (e.key === "Enter") {
          handleSubmit(resp[0].name);
        }

        setSearchResp(resp);
      } catch (error) {
        console.error(error);
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
    // pass city name to fetch it's weather info
    if (city) {
      fetchCurrent(city);
    }
    // store city in local storage to load its weather next time page is loaded
    localStorage.setItem("city", city);
  }

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h1>WEATHER</h1>
        <p style={{ margin: 0, fontSize: "0.8rem" }}>
          Powered by{" "}
          <a href="https://www.weatherapi.com/" title="Free Weather API">
            WeatherAPI.com
          </a>
        </p>
      </div>
      <div className="searchbar">
        <button
          className="switch btn"
          type="button"
          onClick={() => setTempToggle(!tempToggle)}
        >
          {tempToggle ? "°F" : "°C"}
        </button>
        <button
          className="search-btn btn"
          type="button"
          onClick={() => {
            const searchbar = document.getElementsByClassName("search")[0];
            searchbar.setAttribute("style", "display: block");
            searchbar.focus();
          }}
        >
          <icons.SearchIcon />
        </button>
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
          onBlur={(e) => {
            const searchbar = document.getElementsByClassName("search")[0];
            if (searchbar.getAttribute("style")) {
              searchbar.removeAttribute("style", "display: block;");
            }
            e.target.value = "";

            const searchResults =
              document.getElementsByClassName("search-results")[0];
            setTimeout(() => searchResults.setAttribute("style", "display: none;"),100);
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
                onClick={() => {
                  handleSubmit(location.name);
                }}
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
