import React, { useState } from 'react';

const TempToggle = ({ unit, onUnitToggle }) => {
  const [isChecked, setIsChecked] = useState(unit === 'imperial');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onUnitToggle();
  };

  return (
    <label className='toggle'>
      <input
        type='checkbox'
        className='sr-only'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span
        className={`${
          !isChecked ? 'text-primary bg-[#ebfffc] text-[#626262]' : 'text-body-color'
        }`}
      >
        °C
      </span>
      <span
        className={`${
          isChecked ? 'text-primary bg-[#ebfffc] text-[#626262]' : 'text-body-color'
        }`}
      >
        °F
      </span>
    </label>
  );
};

export default TempToggle;
