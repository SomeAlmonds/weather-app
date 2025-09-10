import { useState } from "react";

const apiURL = "https://api.weatherapi.com/v1";
const apiKey = "65068712977b4a22b8c110604251009";

export default function Header() {
  const [searchResp, setSearchResp] = useState([]);

  async function fetchSearch(e) {
    const { value } = e.target;

    if (value) {
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

  async function handleSubmit(city) {}

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
          onFocus={() => {
            const searchResults =
              document.getElementsByClassName("search-results")[0];
            searchResults.removeAttribute("style");
            console.log(searchResults.attributes);
          }}
          onBlur={() => {
            const searchResults =
              document.getElementsByClassName("search-results")[0];
            searchResults.setAttribute("style", "display: none;");
            console.log(searchResults.attributes);
          }}
        />
        <button type="button" className="search-submit">
          ss
        </button>
        <ul className="search-results">
          {searchResp.map((location) => {
            return (
              <li tabIndex={0} onClick={() => handleSubmit(location.name)}>
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
