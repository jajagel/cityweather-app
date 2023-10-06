import React from 'react';
import HourlyForecastCard from './HourlyForecastCard';

const HourlyForecast = ({weatherData,unit}) => {
  return (
    <div className='h-full flex flex-col gap-5 sm:gap-6'>
    <div className="h-full flex flex-col">
    <HourlyForecastCard weatherData={weatherData} unit={unit}/>
    </div>

  </div>
  );
};
export default HourlyForecast;