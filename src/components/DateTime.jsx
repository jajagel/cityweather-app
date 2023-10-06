import React, { useState, useEffect } from 'react';

const DateTime = ({ weatherData }) => {
  const DateTime = weatherData.location.localtime;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');

  const dateSplit = (dateTime) => {
    const dateStr = new Date(dateTime);
    const dateFormatted = dateStr.toLocaleString('en-US', { month: 'long', day: 'numeric' });
    const dayFormatted = dateStr.toLocaleString('en-US', { weekday: 'short' });

    const timeStr = dateStr.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    const [hours, minutes] = timeStr.split(':');
    const formattedHours = (parseInt(hours) % 12) || 12;
    const timeFormatted = `${formattedHours}:${minutes} `;

    setDate(dateFormatted);
    setDay(dayFormatted);
    setTime(timeFormatted);
  };

  useEffect(() => {
    dateSplit(DateTime);
  }, [DateTime]);

  return (
    <div>
      <div className=" gap-4 text-[#ffffffc9] text-center">
        {time} &nbsp; | &nbsp;  {day}, {date}
      </div>
    </div>
  );
};

export default DateTime;

