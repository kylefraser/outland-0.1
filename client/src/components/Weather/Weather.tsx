import { useEffect } from 'react';

const OPENWEATHER_API = import.meta.env.OPENWEATHER_API;

const Weather = () => {
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${43.37737}&lon=${-70.46701}&appid=${'615537802d38235597ef87d0b25ac1d4'}`
    ).then((response) => console.log(response));
  }, []);

  return (
    <div>
      <p>Hey</p>
    </div>
  );
};

export default Weather;
