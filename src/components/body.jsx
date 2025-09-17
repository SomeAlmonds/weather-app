import { images, icons } from "../assets/assets";

const { night, clouds, lightClouds } = images;

// TODO: integrate map API
export function Body({ forecastObj }) {
  const { current, location, forecast } = forecastObj;

  return (
    <div className="body">
      <div className="bg">
        <img
          src={night}
          alt="night sky"
          height={window.innerHeight}
          width={window.innerWidth}
        />
      </div>

      {/* ////////////////////////////////////// */}

      <div className="body-content">
        <div className="primary-info">
          <div className="p-info1">
            <div>
              <img
                src={current?.condition?.icon}
                alt={current?.condition?.text}
              />
              <p className="temp-p">{current?.temp_c}</p>
            </div>

            <div>
              <p>
                WIND: {current?.wind_kph + " km/h "}
                {<icons.ArrowUp rotation={current?.wind_degree} />}
                {current?.wind_dir}
              </p>
              <p>HUMIDITY: {current?.humidity}%</p>
              <p>UV INDEX: {uvIndexScale(current?.uv)}</p>
            </div>
          </div>

          <div className="p-info2">
            <div>
              <p>{location?.name}</p>
              <hr></hr>
              <p>{location?.country}</p>
            </div>
            <icons.locationIcon />
          </div>
        </div>
        {/* //////////////////////////////////////////////// */}
        <div className="forcast-info">
          <ForecastDays forecast={forecast} />
        </div>
      </div>
    </div>
  );
}

function ForecastDays({ forecast }) {
  // logic for upcoming days forcast component

  // NOTE:
  // WeatherAPI for some reason returns the current day with the forecast object for the next days
  // and the free plan only offers 3 days but showing only tow for the forcast object doesn't look nice
  // so I'm including the current day in the forecast section aswell

  return forecast?.forecastday.map((day) => {
    let date = new Date(day.date);
    let weekday = String(date).split(" ")[0];

    return (
      <div className="day" key={date}>
        <p>{weekday}</p>
        <div className="sun-rise-set">
          <div>
            <icons.SunRise /> {day.astro.sunrise}
          </div>
          <div>
            <icons.SunSet /> {day.astro.sunset}
          </div>
        </div>
        <div className="avg-temp">
          {`Min: ${day.day.mintemp_c} | Max: ${day.day.maxtemp_c}`}
        </div>

        <div id={"expand-" + weekday} style={{ display: "none" }}>
          <div className="day-condition">
            {day.day.condition.text}{" "}
            <img
              src={day.day.condition.icon}
              alt={`${day.day.condition.text} icon`}
              width={40}
            />
          </div>

          <p>Chance of rain: {day.day.daily_chance_of_rain}%</p>
          <p>Max wind speed: {day.day.maxwind_kph}</p>
          <p>UV index: {uvIndexScale(day.day.uv)}</p>
        </div>

        <button
          type="button"
          className="expand-info-btn"
          onClick={() => {
            let element = document.getElementById("expand-" + weekday);
            element.getAttribute("style", "display")
              ? element.removeAttribute("style")
              : element.setAttribute("style", "display: none");
          }}
        ><icons.ChevronIcon /></button>
      </div>
    );
  });
}

function uvIndexScale(uvNum) {
  // This function is made because the API returns the UV index as an integer
  // but I want to display it as a scale from low to high

  if (uvNum < 3) {
    return "LOW";
  } else if (uvNum < 6) {
    return "MODERATE";
  } else if (uvNum < 8) {
    return "HIGH";
  } else if (uvNum < 11) {
    return "VERY HIGH";
  } else if (uvNum > 10) {
    return "EXTREME";
  } else {
    return "Unknown";
  }
}
