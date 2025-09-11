import { images, icons } from "../assets/assets";

const { night, clouds, lightClouds } = images;

// TODO: integrate map API
export function Body({ currentWeather }) {
  const { current, location } = currentWeather;


  return (
    <div className="body">
      <div className="bg">
        <img src={night} alt="night sky" height={window.innerHeight} width={window.innerWidth}/>
      </div>
      <div className="body-content">
        <div className="primary-info">
          <div className="p-info1"></div>
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
