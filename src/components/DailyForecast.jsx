import React from 'react'
import DailyForecastCard from './DailyForecastCard';
const DailyForecast = ({weatherData, unit}) => {
    return (
        <div className='h-full flex flex-col gap-5 sm:gap-6 '>
        <div className="h-full flex flex-col">
        <DailyForecastCard weatherData={weatherData} unit={unit}/>
        </div>
      </div>
      );
}

export default DailyForecast