import { useState } from "react";
import { icons } from "../assets/assets";

export default function Header({ fetchCurrent, tempToggle, setTempToggle }) {
  const [searchResp, setSearchResp] = useState([]);

  function hideSearch(submit) {
    const searchbar = document.getElementsByClassName("search")[0];
    const searchResults = document.getElementsByClassName("location");

    if (
      submit ||
      (!searchResults.includes(document.activeElement) &&
        document.activeElement !== searchbar)
    ) {
      if (searchbar.getAttribute("style")) {
        searchbar.removeAttribute("style", "display: block;");
      }
      setSearchResp([]);
    }
  }

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
        let resp = await fetch(
          `https://weather-app-backend-pi.vercel.app/api/search?input=${value}`
        );

        if (!resp.ok) {
          throw new Error(resp);
        }
        resp = await resp.json();

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

      <div className="search-area">
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

        <div className="search-container">
          <input
            type="text"
            className="search"
            name="search"
            placeholder="Search locations..."
            autoComplete="off"
            onChange={(e) => fetchSearch(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(searchResp[0].name);
                e.target.value = "";
                hideSearch(1);
              }
            }}
            onBlur={() => hideSearch(0)}
          />

          <ul className="search-results">
            {searchResp.map((location) => {
              return (
                <li
                  className="location"
                  key={location.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(location.name);
                      hideSearch(1);
                    }
                  }}
                  onClick={() => {
                    handleSubmit(location.name);
                    hideSearch(1);
                  }}
                  onBlur={() => hideSearch(0)}
                >
                  <p>{location.name}</p>
                  <p>{location.country}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
