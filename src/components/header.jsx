import { useState } from "react";

const apiURL = "https://api.weatherapi.com/v1";
const apiKey = "65068712977b4a22b8c110604251009";

export default function Header({ fetchCurrent }) {
  const [searchResp, setSearchResp] = useState([]);

  async function fetchSearch(e) {
    const { value } = e.target;

    if (value) {
      const searchResults =
        document.getElementsByClassName("search-results")[0];

      if (searchResults.getAttribute("style")) {
        searchResults.removeAttribute("style", "display: none;");
      }

      try {
        let resp = await fetch(
          `${apiURL}/search.json?key=${apiKey}&q=${value}`
        );
        if (!resp.ok) {
          throw new Error(resp);
        }
        resp = await resp.json();
        setSearchResp(resp);
      } catch (error) {
        console.warn(error);
      }
    }
  }

  async function handleSubmit(city) {
    console.log(":D");
    const searchResults = document.getElementsByClassName("search-results")[0];
    searchResults.setAttribute("style", "display: none;");
    fetchCurrent(city);
  }

  return (
    <div className="navbar">
      <div className="navbar-logo">WEATHER</div>
      <div className="searchbar">
        <input
          type="text"
          className="search"
          name="search"
          placeholder="Search..."
          onChange={(e) => fetchSearch(e)}
        />
        <button type="button" className="search-submit">
          ss
        </button>
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
