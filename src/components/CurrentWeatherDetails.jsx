import React from 'react'
import * as assets from '../assets';

const CurrentWeatherDetails = ({weatherData,unit}) => {
    document.cookie = `img=${weatherData.current.condition.icon}; SameSite=None; Secure`;
  return (
    <div className="">
        <div className="weather-image">
            <img src={`https:${weatherData.current.condition.icon}`} alt="weather-image" />
        </div>
        <div className="weather-temp">
            {unit === 'metric'
            ? `${weatherData.current.temp_c}°C`
            : `${weatherData.current.temp_f}°F`}
        </div>
        <div className=" max-w-xs text-center">
          <span className="text-2xl pr-3">{weatherData.location.name}</span>
          <span className="uppercase text-[#ffffff9f]">{weatherData.location.country}</span>
        </div>
        <div className="weather-country">
            {weatherData.current.condition.text}
        </div>
        
        <div className="data-container">
        <div className="element">
            <img src={assets.humidity} alt="" className="icon" />
            <div className="data">
                <div className="humidity-percent">{weatherData.current.humidity} %</div>
                <div className="text">Humidity</div>
        </div>
        </div>
        <div className="element">
            <img src={assets.wind} alt="" className="icon" />
            <div className="data">
                <div className="humidity-percent">{weatherData.current.wind_kph} kph</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CurrentWeatherDetails