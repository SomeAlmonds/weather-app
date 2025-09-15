export const images = {
  night: "../src/assets/clear-night.jpg",
  clouds: "../src/assets/Clouds.png",
  lightClouds: "../src/assets/light-clouds.png",
};

export const icons = {
  locationIcon: () => {return(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="location-icon bi bi-geo-alt-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
    </svg>
  )},

  ArrowUp: ({rotation}) => {return (
    <svg style={{rotate: `${rotation}deg`}}
      xmlns="http://www.w3.org/2000/svg"
      width="19"  
      height="19"
      fill="currentColor"
      className="bi bi-arrow-up"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
      />
    </svg>
  );},


};