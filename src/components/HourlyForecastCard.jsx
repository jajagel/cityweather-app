import React from 'react';

const HourlyForecastCard = ({ weatherData, unit }) => {
  const hourlyForecastData = weatherData.forecast.forecastday[0].hour;

  const currentLocalTime = new Date(weatherData.location.localtime);

  const filteredHourlyForecastData = hourlyForecastData.filter((forecast, index) => {
    const forecastTime = new Date(forecast.time);
    return index % 2 === 0 && forecastTime >= currentLocalTime;
  }).slice(0, 5);

  const isEmpty = filteredHourlyForecastData.length === 0;

  
  return (
    <>
    {isEmpty ? (
        <div className='text-[#ffffff9f]'>No hourly forecasts available.</div>
      ) : (
      <div>
        {filteredHourlyForecastData.map((forecast, index) => (
          <div key={index} className="flex gap-4 justify-between items-center h-full">
           <div>{formatForecastTime(forecast.time)}</div>
            <div>
              <div className="w-14">
                <img src={`https:${forecast.condition.icon}`} alt="weather-image" />
              </div>
            </div>
            <div>
              {unit === 'metric'
                ? `${forecast.temp_c}°C`
                : `${forecast.temp_f}°F`}
            </div>
          </div>
        ))}
      </div>
      )
      }
    </>
  );
};

export default HourlyForecastCard;

function formatForecastTime(timeStr) {
  const [datePart, timePart] = timeStr.split(' ');

  const [hours, minutes] = timePart.split(':');

  const period = parseInt(hours) >= 12 ? 'PM' : 'AM';

  const formattedHours = (parseInt(hours) % 12) || 12;

  return `${formattedHours} ${period}`;
}