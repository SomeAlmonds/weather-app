import { images, icons } from "../assets/assets";

const { night, clouds, lightClouds } = images;

// TODO: integrate map API
export function Body({ forecastObj, tempToggle }) {
  const { current, location, forecast } = forecastObj;

  // these variables are for toggling between celcius/kph and fahrenheit/mph
  let tempVar = tempToggle ? "temp_c" : "temp_f";
  let windVar = tempToggle ? "wind_kph" : "wind_mph";
  let [tempIndecator, windIndecator] = tempToggle
    ? ["°C", "km/h"]
    : ["°F", "mph"];

  return (
    <div className="body">
      <div className="bg">
        <img
          src={night}
          alt="night sky"
          height={window.innerHeight}
          width="1000"
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
              <p className="temp-p">
                {(current ? current[tempVar] : "") + tempIndecator}
              </p>
            </div>

            <div>
              <p>
                WIND: {(current ? current[windVar] : "")} {windIndecator}
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
          <ForecastDays
            forecast={forecast}
            tempVar={tempVar}
            windVar={windVar}
            tempIndecator={tempIndecator}
            windIndecator={windIndecator}
          />
        </div>
      </div>
    </div>
  );
}

function ForecastDays({ forecast, tempVar, windVar, tempIndecator, windIndecator }) {
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
        <p className="day-name">{weekday}</p>
        <div className="sun-rise-set">
          <div>
            <icons.SunRise /> {day.astro.sunrise}
          </div>
          <div>
            <icons.SunSet /> {day.astro.sunset}
          </div>
        </div>

        <div className="extra-info">
          <p>
            Temp:{" "}
            {`Min: ${day.day[`min${tempVar}`]}${tempIndecator} | Max: ${
              day.day[`max${tempVar}`]
            }${tempIndecator}`}
          </p>
          <p className="day-condition">
            {day.day.condition.text}{" "}
            <img
              src={day.day.condition.icon}
              alt={`${day.day.condition.text} icon`}
              width={35}
            />
          </p>

          <p>Chance of rain: {day.day.daily_chance_of_rain}%</p>
          <p>Max wind speed: {day.day[`max${windVar}`]} {windIndecator}</p>
          <p>UV index: {uvIndexScale(day.day.uv)}</p>
        </div>
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
