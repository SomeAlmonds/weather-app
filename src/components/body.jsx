import { images, icons } from "../assets/assets";

const { night, clouds, lightClouds } = images;

// TODO: integrate map API
export function Body({ currentWeather }) {
  const { current, location } = currentWeather;

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
        <div className="forcast-info">;</div>
      </div>
    </div>
  );
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
