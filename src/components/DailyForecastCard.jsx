import React from 'react';

const DailyForecastCard = ({ weatherData, unit }) => {
  const dailyForecastData = weatherData.forecast.forecastday;
  const formatDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { weekday: 'short' });
  };
  return (
    <>
      <div>
        {dailyForecastData.map((forecast, index) => (
          <div key={index} className="flex gap-4 justify-between items-center h-full">
            <div>{formatDayOfWeek(forecast.date)}</div>
            <div>
              <div className="w-14">
                <img src={`https:${forecast.day.condition.icon}`} alt="weather-image" />
              </div>
            </div>
            <div>
              {unit === 'metric'
                ? `${forecast.day.avgtemp_c}°C`
                : `${forecast.day.avgtemp_f}°F`}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DailyForecastCard;
